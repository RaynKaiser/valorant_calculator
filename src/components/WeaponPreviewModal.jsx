import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Play, Pause, Volume1, Volume2, VolumeX, Maximize2, 
  Sparkles, Film, Palette, X, Layers, Check, Coins, 
  Shield, AlertCircle, Info, ExternalLink
} from 'lucide-react';
import { regions } from '../data/regions';
import { formatCurrency, convertCurrency } from '../data/currencies';
import { calculateBestVPPacks } from '../utils/vpCalculator';

// Helper to determine chroma variant badge color
const getChromaColor = (name, index) => {
  if (!name || index === 0) return '#ff4655'; // Base Valorant red
  const lower = name.toLowerCase();
  if (lower.includes('white')) return '#f8fafc';
  if (lower.includes('black') || lower.includes('dark') || lower.includes('midnight')) return '#1e293b';
  if (lower.includes('orange')) return '#f97316';
  if (lower.includes('blue') || lower.includes('cyan')) return '#0ea5e9';
  if (lower.includes('purple') || lower.includes('violet')) return '#a855f7';
  if (lower.includes('green')) return '#10b981';
  if (lower.includes('red')) return '#ef4444';
  if (lower.includes('yellow') || lower.includes('gold')) return '#eab308';
  if (lower.includes('pink') || lower.includes('rose')) return '#ec4899';
  
  // Fallbacks by variant index
  const palette = ['#ff4655', '#a855f7', '#0ea5e9', '#f97316', '#10b981'];
  return palette[index % palette.length];
};

const getLevelItemDescription = (item) => {
  if (!item) return 'Base Weapon Model';
  const clean = item.replace('EEquippableSkinLevelItem::', '');
  switch (clean) {
    case 'Animation':
      return 'Custom Reload, Equip & Inspect';
    case 'Finisher':
      return 'Finisher & Kill Banner';
    case 'VFX':
      return 'VFX, Muzzle Flash & Tracers';
    case 'SoundEffects':
      return 'Gunshot, Reload & Inspect SFX';
    case 'KillBanner':
      return 'Custom Kill Banner';
    case 'KillCounter':
      return 'Digital Kill Counter Screen';
    case 'Randomizer':
      return 'Dynamic Model Variations';
    case 'TopFrag':
      return 'Top Frag Reactive Champion Glow';
    case 'Heartbeat':
      return 'Reactive Heartbeat Sensor';
    case 'InspectAndKill':
      return 'Inspect & Kill Reactive Animations';
    default:
      return clean;
  }
};

export const WeaponPreviewModal = ({ 
  skin, 
  onClose, 
  onSelectForCalc, 
  isSelectedForCalc = false,
  accountRegion = 'NA',
  payCurrency = 'USD'
}) => {
  if (!skin) return null;

  const levels = skin.levels || [];
  const chromas = skin.chromas || [];

  // Find default level to show (prefer highest level with video, e.g. Finisher / Animations)
  const defaultLevelIdx = (() => {
    if (!levels.length) return 0;
    for (let i = levels.length - 1; i >= 0; i--) {
      if (levels[i].video) return i;
    }
    return 0;
  })();

  const [selectedLevelIdx, setSelectedLevelIdx] = useState(defaultLevelIdx);
  const [selectedChromaIdx, setSelectedChromaIdx] = useState(0);
  const [viewMode, setViewMode] = useState('video'); // 'video' | 'render'
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const currentLevel = levels[selectedLevelIdx] || null;
  const currentChroma = chromas[selectedChromaIdx] || null;

  // Active video source (prefer chroma-specific video if available, else active level video)
  const activeVideoUrl = (currentChroma?.video) || (currentLevel?.video) || null;

  // Has at least one video across levels or chromas
  const hasAnyVideo = levels.some(l => l.video) || chromas.some(c => c.video);

  // High res render image
  const activeRenderImg = currentChroma?.fullRender || currentChroma?.icon || skin.icon;

  // Real-time calculation of estimated cash cost in the user's active region and currency
  const cashEstimateStr = useMemo(() => {
    try {
      const regionData = regions[accountRegion];
      if (!regionData || !skin.cost) return null;
      const result = calculateBestVPPacks(skin.cost, regionData.packs);
      const convertedTotal = convertCurrency(result.totalCost, regionData.currencyCode, payCurrency);
      return formatCurrency(convertedTotal, payCurrency);
    } catch {
      return null;
    }
  }, [skin.cost, accountRegion, payCurrency]);

  // Auto-switch viewMode if video is available or not
  useEffect(() => {
    if (activeVideoUrl) {
      setViewMode('video');
      setIsVideoLoading(true);
    } else {
      setViewMode('render');
    }
  }, [selectedLevelIdx, selectedChromaIdx, activeVideoUrl]);

  // Apply volume changes to video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Handle ESC and keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' && activeVideoUrl && viewMode === 'video') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoUrl, viewMode, isPlaying, isMuted, volume]);

  // Prevent background body scrolling when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      setIsMuted(false);
      videoRef.current.muted = false;
      if (volume === 0) {
        setVolume(0.8);
        videoRef.current.volume = 0.8;
      }
    } else {
      setIsMuted(true);
      videoRef.current.muted = true;
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      } else if (newVol === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(err => console.error(err));
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(current);
    setVideoProgress((current / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsVideoLoading(false);
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pos * duration;
    setVideoProgress(pos * 100);
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Render proper speaker icon
  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX size={17} />;
    }
    if (volume < 0.5) {
      return <Volume1 size={17} />;
    }
    return <Volume2 size={17} />;
  };

  return (
    <div className="weapon-modal-overlay" onClick={onClose}>
      <div 
        className="weapon-modal-card" 
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        style={{ '--tier-accent': skin.tierColor || 'var(--accent-red)' }}
      >
        {/* Top Decorative Border Accent */}
        <div className="weapon-modal-top-accent"></div>

        {/* Modal Header */}
        <div className="weapon-modal-header">
          <div className="weapon-modal-title-group">
            <h2 className="weapon-modal-name">{skin.name}</h2>
            <div className="weapon-modal-badges">
              <span className={`tier-badge-pill ${skin.tierBadgeClass || 'tier-select'}`}>
                {skin.tierName}
              </span>
              <span className="weapon-category-pill">
                {skin.weapon || (skin.isMelee ? 'Melee' : 'Gun')}
              </span>
              {skin.isMelee && <span className="melee-pill">Melee</span>}
              {hasAnyVideo && (
                <span className="video-badge-pill">
                  <Film size={12} style={{ marginRight: 4 }} />
                  <span className="badge-desktop-text">In-Game Animations Included</span>
                  <span className="badge-mobile-text">Animations</span>
                </span>
              )}
            </div>
          </div>

          <div className="weapon-modal-header-actions">
            {/* Redesigned High-End Header Cost Display */}
            <div className="weapon-cost-display">
              <Coins size={15} className="header-vp-coin" />
              <span className="vp-amount">{skin.cost.toLocaleString()} VP</span>
            </div>
            <button 
              className="weapon-modal-close-btn" 
              onClick={onClose}
              title="Close inspection (Esc)"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 2-COLUMN MAIN CONTENT SPLIT */}
        <div className="weapon-modal-main-split">
          
          {/* LEFT COLUMN: Stage (Video / 3D Render) & Dedicated Audio/Playback Controls */}
          <div className="weapon-modal-left-col">
            <div className="stage-frame-wrapper">
              {viewMode === 'video' && activeVideoUrl ? (
                <div className="weapon-video-container" onClick={togglePlayPause}>
                  <video
                    ref={videoRef}
                    src={activeVideoUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onWaiting={() => setIsVideoLoading(true)}
                    onPlaying={() => setIsVideoLoading(false)}
                    className="weapon-stage-video"
                  />

                  {/* Video Loading Spinner */}
                  {isVideoLoading && (
                    <div className="video-loading-overlay">
                      <div className="loading-spinner-ring"></div>
                      <span>Buffering Animation...</span>
                    </div>
                  )}

                  {/* Floating Unmute Prompt (if muted) */}
                  {isMuted && (
                    <button 
                      className="unmute-floating-banner"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(false);
                        if (volume === 0) setVolume(0.8);
                        if (videoRef.current) {
                          videoRef.current.muted = false;
                          videoRef.current.volume = volume === 0 ? 0.8 : volume;
                        }
                      }}
                      title="Unmute to hear gunshots, animations & finisher"
                    >
                      <Volume2 size={15} />
                      <span className="unmute-desktop-text">Unmute Sound FX & Music</span>
                      <span className="unmute-mobile-text">Unmute SFX</span>
                      <div className="audio-wave-anim">
                        <span></span><span></span><span></span><span></span>
                      </div>
                    </button>
                  )}

                  {/* Level Tag Overlay */}
                  <div className="video-level-overlay-tag">
                    <Sparkles size={12} color="var(--accent-red)" />
                    <span>
                      {currentLevel?.name || `Level ${selectedLevelIdx + 1}`}
                      {currentLevel?.item && (
                        <span className="level-item-desc"> — {getLevelItemDescription(currentLevel.item)}</span>
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="weapon-render-container">
                  <div 
                    className="weapon-render-glow"
                    style={{ 
                      background: `radial-gradient(circle at 50% 50%, ${getChromaColor(currentChroma?.name, selectedChromaIdx)}25 0%, transparent 70%)` 
                    }}
                  ></div>
                  <img 
                    src={activeRenderImg} 
                    alt={currentChroma?.name || skin.name} 
                    className="weapon-full-render-img"
                  />
                  <div className="render-variant-label">
                    <span>{currentChroma?.name || skin.name}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Stage Footer Bar: Controls & Mode Switcher */}
            <div className="stage-controls-bar">
              {viewMode === 'video' && activeVideoUrl ? (
                <div className="player-toolbar">
                  {/* Play/Pause */}
                  <button 
                    className="player-ctrl-btn"
                    onClick={togglePlayPause}
                    title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                  >
                    {isPlaying ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
                  </button>

                  {/* Scrubber Progress Bar */}
                  <div className="player-progress-bar-wrap" onClick={handleSeek}>
                    <div 
                      className="player-progress-fill" 
                      style={{ width: `${videoProgress}%` }}
                    >
                      <div className="player-progress-thumb"></div>
                    </div>
                  </div>

                  {/* Time Display */}
                  <span className="player-time-display">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>

                  {/* Volume Controller (Speaker button + Slider) */}
                  <div className="player-volume-control">
                    <button 
                      className={`player-ctrl-btn ${!isMuted && volume > 0 ? 'active-audio' : ''}`}
                      onClick={toggleMute}
                      title={isMuted ? "Unmute (M)" : "Mute (M)"}
                    >
                      {renderVolumeIcon()}
                    </button>
                    
                    <div className="volume-slider-wrapper">
                      <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.02"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                        title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                        style={{
                          '--volume-percent': `${(isMuted ? 0 : volume) * 100}%`
                        }}
                      />
                      <span className="volume-percent-label">
                        {Math.round((isMuted ? 0 : volume) * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Fullscreen */}
                  <button 
                    className="player-ctrl-btn"
                    onClick={toggleFullscreen}
                    title="Fullscreen"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              ) : null}

              {/* Mode Switcher (Video vs 3D Render) */}
              {hasAnyVideo && (
                <div className="stage-mode-switcher-bottom">
                  <button 
                    className={`stage-mode-btn ${viewMode === 'video' ? 'active' : ''}`}
                    onClick={() => setViewMode('video')}
                    disabled={!activeVideoUrl}
                  >
                    <Film size={14} />
                    <span>In-Game Animation</span>
                  </button>
                  <button 
                    className={`stage-mode-btn ${viewMode === 'render' ? 'active' : ''}`}
                    onClick={() => setViewMode('render')}
                  >
                    <Layers size={14} />
                    <span>3D Weapon Render</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Upgrade Progression Levels, Chromas, Specs, Actions */}
          <div className="weapon-modal-right-col">
            <div className="right-col-content-scroll">
              
              {/* 1. Level Progression Switcher */}
              {levels.length > 0 && (
                <div className="panel-group-section">
                  <div className="section-header-row">
                    <span className="section-title">
                      <Layers size={15} color="var(--accent-red)" />
                      Upgrade Levels ({levels.length}):
                    </span>
                    <span className="section-subtitle">
                      Click to preview animations & SFX
                    </span>
                  </div>

                  <div className="levels-pills-list">
                    {levels.map((lvl, idx) => {
                      const isActive = selectedLevelIdx === idx;
                      const hasVideo = !!lvl.video;
                      return (
                        <button
                          key={lvl.uuid || idx}
                          className={`level-pill-card ${isActive ? 'active' : ''} ${hasVideo ? 'has-video' : ''}`}
                          onClick={() => {
                            setSelectedLevelIdx(idx);
                            if (hasVideo) setViewMode('video');
                          }}
                        >
                          <div className="level-pill-left">
                            <span className="level-number-badge">LVL {idx + 1}</span>
                            <span className="level-pill-title">
                              {lvl.item ? getLevelItemDescription(lvl.item) : (idx === 0 ? 'Base Weapon Model' : `Level ${idx + 1}`)}
                            </span>
                          </div>

                          <div className="level-pill-right">
                            {hasVideo ? (
                              <span className="level-video-badge" title="Animation video available">
                                <Play size={11} fill="currentColor" />
                                <span>Video</span>
                              </span>
                            ) : (
                              <span className="level-base-indicator">Base</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Chroma / Color Variants */}
              {chromas.length > 1 && (
                <div className="panel-group-section">
                  <div className="section-header-row">
                    <span className="section-title">
                      <Palette size={15} color="var(--accent-red)" />
                      Color Variants / Chromas ({chromas.length}):
                    </span>
                    <span className="section-subtitle">
                      Unlockable colorways
                    </span>
                  </div>

                  <div className="chromas-list-grid">
                    {chromas.map((chr, idx) => {
                      const isSelected = selectedChromaIdx === idx;
                      const color = getChromaColor(chr.name, idx);
                      
                      // Format clean, concise color name so it NEVER truncates with "..."
                      let cleanName = 'Default';
                      if (idx > 0) {
                        if (chr.name.includes('(')) {
                          cleanName = chr.name.substring(chr.name.indexOf('(') + 1).replace(')', '').trim();
                          // Strip leading "Variant 1 ", "Variant 2 " etc. to display crisp color name (e.g. "Orange", "Purple", "Pink")
                          cleanName = cleanName.replace(/^Variant\s*\d+\s*/i, '').trim();
                        } else {
                          cleanName = `Variant ${idx}`;
                        }
                      }

                      return (
                        <button
                          key={chr.uuid || idx}
                          className={`chroma-card-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedChromaIdx(idx);
                            if (chr.video) setViewMode('video');
                          }}
                          style={{ '--chroma-color': color }}
                          title={chr.name}
                        >
                          <span 
                            className="chroma-color-dot"
                            style={{ backgroundColor: color }}
                          ></span>
                          <span className="chroma-name">{cleanName}</span>
                          {chr.video && (
                            <span className="chroma-video-tag" title="Variant animation video">
                              <Play size={10} fill="currentColor" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Skin Features Summary Banner */}
              <div className="weapon-features-summary">
                <div className="feature-item">
                  <Sparkles size={15} color="#ffd700" />
                  <span>
                    <strong>{levels.length} Upgrade Levels</strong> ({levels.some(l => l.item?.includes('Finisher')) ? 'Includes Finisher & Kill Banner' : 'Visual & SFX upgrades'})
                  </span>
                </div>
                {chromas.length > 1 && (
                  <div className="feature-item">
                    <Palette size={15} color="var(--accent-red)" />
                    <span>
                      <strong>{chromas.length} Colorways</strong> available to unlock
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* 4. PINNED WEAPON STORE COST & CASH CARD (Always Visible, Never Scrolled Away) */}
            <div className="modal-price-card-pinned">
              <div className="price-card-glow"></div>
              <div className="price-card-main">
                <div className="price-card-left">
                  <div className="price-card-label-row">
                    <span className="price-card-tag">STORE ROTATION PRICE</span>
                    <span className="price-region-pill">{accountRegion} Store</span>
                  </div>
                  <div className="price-card-vp-row">
                    <Coins size={22} className="price-coin-icon" />
                    <span className="price-vp-number">{skin.cost.toLocaleString()}</span>
                    <span className="price-vp-unit">VP</span>
                  </div>
                </div>

                {cashEstimateStr && (
                  <div className="price-card-right">
                    <span className="price-cash-label">ESTIMATED CASH ({payCurrency})</span>
                    <span className="price-cash-val">{cashEstimateStr}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column Action Footer: Full Width Action Buttons, No Overlap! */}
            <div className="right-col-actions-bar">
              <button 
                type="button"
                className="modal-secondary-btn"
                onClick={onClose}
              >
                Close
              </button>
              <button 
                type="button"
                className={`modal-primary-btn ${isSelectedForCalc ? 'already-selected' : ''}`}
                onClick={() => {
                  if (onSelectForCalc) onSelectForCalc(skin);
                  onClose();
                }}
              >
                {isSelectedForCalc ? (
                  <>
                    <Check size={16} />
                    <span>Selected for Calculation</span>
                  </>
                ) : (
                  <>
                    <Coins size={16} />
                    <span>Calculate VP Packs & Cash</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
