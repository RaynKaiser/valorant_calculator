import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, ChevronDown, Coins, Calculator, AlertCircle, 
  Sparkles, Trophy, Shield, Tag, Copy, Check, Filter, X 
} from 'lucide-react';
import { regions } from './data/regions';
import { exchangeRatesToUSD, formatCurrency, convertCurrency } from './data/currencies';
import { tierCosts, getSkinCost } from './data/tiers';
import { isBattlepassSkin } from './data/battlepass';
import { vctSpecialBundles, vctTeamsList, getTeamCapsuleBundle } from './data/vctBundles';
import { calculateBestVPPacks } from './utils/vpCalculator';
import { ValXLogo } from './components/ValXLogo';
import './index.css';

const CustomSelect = ({ id, value, onChange, options, placeholder = 'Select...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="custom-select-container" ref={ref}>
      <div 
        className={`custom-select-trigger input-field ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        id={id}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown size={18} className={`chevron ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <div className="dropdown-list custom-select-list">
          {options.map(opt => (
            <div 
              key={opt.value} 
              className={`dropdown-item ${opt.value === value ? 'selected' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  const [skins, setSkins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSkin, setSelectedSkin] = useState(null);
  const [accountRegion, setAccountRegion] = useState('NA');
  const [payCurrency, setPayCurrency] = useState('USD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [calcMode, setCalcMode] = useState('skin'); // 'skin' | 'vct' | 'bundle'
  const [weaponFilter, setWeaponFilter] = useState('All');
  const [vctLeague, setVctLeague] = useState('All'); // 'All' | 'Americas' | 'EMEA' | 'Pacific' | 'China'
  const [teamSearch, setTeamSearch] = useState('');
  const [copied, setCopied] = useState(false);
  
  const dropdownRef = useRef(null);

  // Fetch weapon skins from official Valorant API
  useEffect(() => {
    const fetchWeaponsAndSkins = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://valorant-api.com/v1/weapons');
        const data = await response.json();
        
        const parsedSkins = [];
        data.data.forEach(weapon => {
          const isMelee = weapon.displayName === 'Melee';
          const weaponName = weapon.displayName;
          const category = weapon.category ? weapon.category.replace('EEquippableCategory::', '') : (isMelee ? 'Melee' : 'Gun');
          
          weapon.skins.forEach(skin => {
            // Must have a tier and must NOT be a Battlepass, Agent, or Expired Limited skin
            if (!skin.contentTierUuid || isBattlepassSkin(skin.displayName)) return;
            
            const cost = getSkinCost(skin.displayName, skin.contentTierUuid, isMelee);
            const tierData = tierCosts[skin.contentTierUuid] || { name: 'Edition', color: '#ff4655', badgeClass: 'tier-select' };
            
            parsedSkins.push({
              uuid: skin.uuid,
              name: skin.displayName,
              weapon: weaponName,
              category: category,
              isMelee: isMelee,
              icon: skin.displayIcon || skin.chromas?.[0]?.displayIcon,
              tier: skin.contentTierUuid,
              tierName: tierData.name,
              tierColor: tierData.color,
              tierBadgeClass: tierData.badgeClass,
              cost: cost
            });
          });
        });
        
        parsedSkins.sort((a, b) => a.name.localeCompare(b.name));
        setSkins(parsedSkins);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch weapons, falling back to skins endpoint:', error);
        try {
          const fallbackResp = await fetch('https://valorant-api.com/v1/weapons/skins');
          const fallbackData = await fallbackResp.json();
          const validSkins = fallbackData.data
            .filter(skin => skin.contentTierUuid && !isBattlepassSkin(skin.displayName))
            .map(skin => {
              const isMelee = skin.displayName.toLowerCase().includes('melee') || 
                              skin.displayName.toLowerCase().includes('knife') ||
                              skin.displayName.toLowerCase().includes('karambit') ||
                              skin.displayName.toLowerCase().includes('blade') ||
                              skin.displayName.toLowerCase().includes('dagger') ||
                              skin.displayName.toLowerCase().includes('sword');
              const cost = getSkinCost(skin.displayName, skin.contentTierUuid, isMelee);
              const tierData = tierCosts[skin.contentTierUuid] || { name: 'Edition', color: '#ff4655', badgeClass: 'tier-select' };
              return {
                uuid: skin.uuid,
                name: skin.displayName,
                weapon: isMelee ? 'Melee' : 'Gun',
                category: isMelee ? 'Melee' : 'Gun',
                isMelee: isMelee,
                icon: skin.displayIcon || skin.chromas?.[0]?.displayIcon,
                tier: skin.contentTierUuid,
                tierName: tierData.name,
                tierColor: tierData.color,
                tierBadgeClass: tierData.badgeClass,
                cost: cost
              };
            })
            .sort((a, b) => a.name.localeCompare(b.name));
          setSkins(validSkins);
          setLoading(false);
        } catch (err) {
          console.error('Total fetch failure:', err);
          setLoading(false);
        }
      }
    };
    
    fetchWeaponsAndSkins();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter skins based on search & weapon category
  const filteredSkins = useMemo(() => {
    let result = skins;

    if (weaponFilter !== 'All') {
      if (weaponFilter === 'Melee') {
        result = result.filter(s => s.isMelee);
      } else {
        result = result.filter(s => s.weapon === weaponFilter);
      }
    }

    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(lower));
    }

    return result.slice(0, 60);
  }, [search, skins, weaponFilter]);

  // Purchasable Standard Bundle Options (active bundles only - expired limited bundles removed)
  const bundleOptions = [
    { value: '', label: 'Select a purchasable bundle tier...' },
    { value: 2340, label: '⚡ VCT Team Capsule (2,340 VP)' },
    { value: 3400, label: 'Select Edition Bundle (3,400 VP)' },
    { value: 5100, label: 'Deluxe Edition Bundle (5,100 VP)' },
    { value: 7100, label: 'Premium Edition Bundle (7,100 VP)' },
    { value: 8700, label: 'Exclusive Edition Bundle (8,700 VP)' },
    { value: 9900, label: 'Ultra Edition Bundle (9,900 VP)' },
    { value: 11900, label: 'Exclusive Plus Bundle (11,900 VP)' },
  ];

  const handleSkinSelect = (skin) => {
    setSelectedSkin(skin);
    setSearch(skin.name);
    setIsDropdownOpen(false);
  };

  const handleVctBundleSelect = (bundle) => {
    setSelectedSkin({
      name: bundle.name,
      cost: bundle.cost,
      tierName: 'VCT Capsule',
      tierBadgeClass: 'tier-vct',
      icon: bundle.icon || bundle.verticalIcon,
      isVCT: true,
      tag: bundle.tag,
      items: bundle.items
    });
  };

  const handleVctTeamSelect = (team) => {
    const bundle = getTeamCapsuleBundle(team);
    setSelectedSkin({
      name: bundle.name,
      cost: bundle.cost,
      tierName: 'VCT Capsule',
      tierBadgeClass: 'tier-vct',
      icon: bundle.icon,
      isVCT: true,
      tag: `${team.region.toUpperCase()} • 2,340 VP`,
      team: team
    });
  };

  const handleAccountRegionChange = (newReg) => {
    setAccountRegion(newReg);
    if (regions[newReg]) {
      setPayCurrency(regions[newReg].currencyCode);
    }
  };

  // Calculation Result
  const calculationResult = useMemo(() => {
    if (!selectedSkin) return null;
    
    const regionData = regions[accountRegion];
    if (!regionData) return null;
    
    const result = calculateBestVPPacks(selectedSkin.cost, regionData.packs);
    
    const convertedCost = convertCurrency(result.totalCost, regionData.currencyCode, payCurrency);
    const convertedPacks = result.combination.map(p => ({
      ...p,
      convertedCost: convertCurrency(p.cost, regionData.currencyCode, payCurrency)
    }));
    
    return {
      ...result,
      convertedTotal: convertedCost,
      combination: convertedPacks,
      currencyCode: payCurrency
    };
  }, [selectedSkin, accountRegion, payCurrency]);

  const handleCopySummary = () => {
    if (!selectedSkin || !calculationResult) return;
    const regionName = regions[accountRegion]?.name || accountRegion;
    const totalCostStr = formatCurrency(calculationResult.convertedTotal, payCurrency);
    const packsStr = calculationResult.combination.map(p => `${p.count}x ${p.vp.toLocaleString()} VP`).join(' + ');
    
    const text = `ValX Summary for ${selectedSkin.name}:\n` +
      `Target VP: ${selectedSkin.cost.toLocaleString()} VP\n` +
      `Region: ${regionName}\n` +
      `Total Cost: ${totalCostStr} (${payCurrency})\n` +
      `Recommended Packs: ${packsStr} (Total: ${calculationResult.totalVP.toLocaleString()} VP)\n` +
      `Remaining VP: ${calculationResult.totalVP - selectedSkin.cost} VP`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  // Popular quick-pick skins for instant selection (all 100% purchasable store rotation skins)
  const popularSkins = [
    'Kuronami Vandal', 'Reaver Vandal', 'Prime Vandal', 
    'Mystbloom Phantom', 'Nocturnum Scythe', 'Evori Dreamwings Vandal',
    'Doombringer Sheriff', 'Glitchpop Phantom'
  ];

  // Filtered VCT teams
  const filteredTeams = useMemo(() => {
    return vctTeamsList.filter(team => {
      if (vctLeague !== 'All' && team.region !== vctLeague) return false;
      if (teamSearch.trim()) {
        const query = teamSearch.toLowerCase();
        return team.name.toLowerCase().includes(query) || team.tag.toLowerCase().includes(query);
      }
      return true;
    });
  }, [vctLeague, teamSearch]);

  return (
    <div className="website-container">
      <header className="valx-header">
        <ValXLogo />
        <div className="status-pill">
          <span className="live-indicator"></span>
          <span>Purchasable Store Content Only • Battlepass & Expired Bundles Excluded</span>
        </div>
      </header>

      <main className="main-content">
        <section className="panel controls-panel">
          {/* Main Mode Tabs */}
          <div className="tabs-container">
            <button 
              className={`tab-btn ${calcMode === 'skin' ? 'active' : ''}`}
              onClick={() => {
                setCalcMode('skin');
                if (selectedSkin?.tierName === 'Bundle' || selectedSkin?.isVCT || selectedSkin?.tierName === 'Custom') {
                  setSelectedSkin(null);
                  setSearch('');
                }
              }}
            >
              <Shield size={16} />
              Weapon Skin
            </button>
            <button 
              className={`tab-btn vct-tab-highlight ${calcMode === 'vct' ? 'active' : ''}`}
              onClick={() => {
                setCalcMode('vct');
                if (selectedSkin && !selectedSkin.isVCT) {
                  setSelectedSkin(null);
                }
              }}
            >
              <Trophy size={16} />
              VCT Bundles
              <span className="vct-badge">ACTIVE</span>
            </button>
            <button 
              className={`tab-btn ${calcMode === 'bundle' ? 'active' : ''}`}
              onClick={() => {
                setCalcMode('bundle');
                if (selectedSkin && selectedSkin.tierName !== 'Bundle' && selectedSkin.tierName !== 'Custom') {
                  setSelectedSkin(null);
                  setSearch('');
                }
              }}
            >
              <Tag size={16} />
              Bundle / Custom
            </button>
          </div>

          {/* 1. WEAPON SKIN MODE */}
          {calcMode === 'skin' && (
            <div className="mode-content-fade">
              {/* Weapon Filter Pills */}
              <div className="filter-pills-row">
                <span className="filter-title"><Filter size={14} /> Weapon:</span>
                <div className="filter-scroll">
                  {['All', 'Vandal', 'Phantom', 'Operator', 'Sheriff', 'Outlaw', 'Melee', 'Spectre', 'Ghost'].map(w => (
                    <button
                      key={w}
                      className={`filter-pill ${weaponFilter === w ? 'active' : ''}`}
                      onClick={() => setWeaponFilter(w)}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Search */}
              <div className="form-group">
                <label htmlFor="skin-search">Search Purchasable Skin</label>
                <div className="search-container" ref={dropdownRef}>
                  <div style={{ position: 'relative' }}>
                    <Search size={19} className="search-icon" />
                    <input
                      id="skin-search"
                      type="text"
                      className="input-field"
                      placeholder={loading ? "Loading skins from Valorant API..." : "E.g. Kuronami Vandal, Reaver, Mystbloom..."}
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setIsDropdownOpen(true);
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                      style={{ paddingLeft: '3.4rem', paddingRight: search ? '2.5rem' : '1rem' }}
                      disabled={loading}
                    />
                    {search && (
                      <button 
                        className="clear-search-btn"
                        onClick={() => { setSearch(''); setIsDropdownOpen(false); }}
                        title="Clear search"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  
                  {isDropdownOpen && !loading && (
                    <div className="dropdown-list">
                      {filteredSkins.length > 0 ? (
                        filteredSkins.map(skin => (
                          <div 
                            key={skin.uuid} 
                            className={`dropdown-item ${selectedSkin?.uuid === skin.uuid ? 'selected' : ''}`} 
                            onClick={() => handleSkinSelect(skin)}
                          >
                            {skin.icon ? (
                              <img src={skin.icon} alt={skin.name} className="skin-thumb" />
                            ) : (
                              <div className="skin-thumb-placeholder"></div>
                            )}
                            <div className="skin-info">
                              <span className="skin-name">{skin.name}</span>
                              <div className="skin-sub-info">
                                <span className={`tier-tag ${skin.tierBadgeClass}`}>{skin.tierName}</span>
                                <span className="skin-cost-badge">{skin.cost.toLocaleString()} VP</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="dropdown-item" style={{justifyContent: 'center', color: 'var(--text-secondary)'}}>
                          No purchasable skins found (Battlepass & expired items excluded)
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Picks */}
              <div className="quick-picks-container">
                <span className="quick-picks-label"><Sparkles size={14} color="var(--accent-red)" /> Trending:</span>
                <div className="quick-picks-list">
                  {popularSkins.map(name => {
                    const found = skins.find(s => s.name === name);
                    if (!found) return null;
                    return (
                      <button
                        key={name}
                        className="quick-pick-btn"
                        onClick={() => handleSkinSelect(found)}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 2. VCT PURCHASABLE BUNDLES MODE */}
          {calcMode === 'vct' && (
            <div className="mode-content-fade vct-section">
              <div className="vct-intro-card">
                <div className="vct-intro-left">
                  <div className="vct-glow-badge">VALORANT ESPORTS STORE</div>
                  <h3>Official VCT Team Capsules (2,340 VP)</h3>
                  <p>Support partnered esports teams directly. Includes Classic skin, AR Player Card, Buddy, and Animated Spray.</p>
                </div>
                <Trophy size={36} className="vct-intro-icon" />
              </div>

              {/* Generic Capsule Shortcut */}
              <div className="vct-grid-bundles" style={{marginBottom: '1.25rem'}}>
                {vctSpecialBundles.map(bundle => (
                  <div 
                    key={bundle.id}
                    className={`vct-card ${selectedSkin?.name === bundle.name ? 'active-vct' : ''}`}
                    onClick={() => handleVctBundleSelect(bundle)}
                  >
                    <div className="vct-card-img-wrap">
                      <img src={bundle.icon} alt={bundle.name} />
                      <span className="vct-tag-badge">{bundle.tag}</span>
                    </div>
                    <div className="vct-card-body">
                      <span className="vct-card-title">{bundle.name}</span>
                      <span className="vct-card-cost">
                        <Coins size={14} color="var(--accent-red)" style={{marginRight: 4}} />
                        {bundle.cost.toLocaleString()} VP
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Partnered Team Selection */}
              <div className="vct-cards-group">
                <div className="vct-capsules-header">
                  <h4 className="vct-group-title">⚡ Select Partnered Team Capsule</h4>
                  
                  {/* Search Team */}
                  <div style={{position: 'relative', minWidth: '180px'}}>
                    <Search size={15} style={{position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)'}} />
                    <input 
                      type="text"
                      className="input-field"
                      placeholder="Find team..."
                      value={teamSearch}
                      onChange={(e) => setTeamSearch(e.target.value)}
                      style={{padding: '0.45rem 0.75rem 0.45rem 2.2rem', fontSize: '0.85rem'}}
                    />
                  </div>

                  <div className="league-filter-row">
                    {['All', 'Americas', 'EMEA', 'Pacific', 'China'].map(league => (
                      <button
                        key={league}
                        className={`league-btn ${vctLeague === league ? 'active' : ''}`}
                        onClick={() => setVctLeague(league)}
                      >
                        {league}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="vct-teams-grid">
                  {filteredTeams.map(team => {
                    const isSelected = selectedSkin?.name?.includes(team.tag);
                    return (
                      <div 
                        key={team.tag}
                        className={`team-card ${isSelected ? 'selected-team' : ''}`}
                        onClick={() => handleVctTeamSelect(team)}
                        style={{ '--team-color': team.color }}
                        title={`${team.name} (${team.tag}) — ${team.region} — 2,340 VP`}
                      >
                        <div className="team-logo-container">
                          {team.logoIcon ? (
                            <>
                              <img 
                                src={team.logoIcon} 
                                alt={team.name} 
                                className="team-logo-img" 
                                loading="lazy"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  const fallback = e.target.parentElement.querySelector('.team-badge-fallback');
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                              <div 
                                className="team-badge-fallback" 
                                style={{ 
                                  display: 'none', 
                                  backgroundColor: team.color,
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: '8px',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 800,
                                  fontSize: '0.8rem',
                                  color: '#fff'
                                }}
                              >
                                {team.tag}
                              </div>
                            </>
                          ) : (
                            <div className="team-badge" style={{ backgroundColor: team.color }}>
                              {team.tag}
                            </div>
                          )}
                        </div>
                        <div className="team-info">
                          <span className="team-tag-label">{team.tag}</span>
                          <span className="team-league">{team.region} • 2,340 VP</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 3. BUNDLE / CUSTOM MODE */}
          {calcMode === 'bundle' && (
            <div className="mode-content-fade">
              <div className="form-group">
                <label htmlFor="bundle-select">Preset Purchasable Bundle Tier</label>
                <CustomSelect 
                  id="bundle-select"
                  value={selectedSkin?.tierName === 'Bundle' || selectedSkin?.isVCT ? selectedSkin.cost : ''}
                  onChange={(val) => {
                    if (val) {
                      const opt = bundleOptions.find(o => o.value === val);
                      const label = opt ? opt.label.replace(/^[⚡🏆]\s*/, '').split(' (')[0] : 'Bundle';
                      setSelectedSkin({ 
                        name: label, 
                        cost: val, 
                        tierName: 'Bundle', 
                        tierBadgeClass: 'tier-bundle',
                        icon: null 
                      });
                      setSearch('');
                    } else {
                      setSelectedSkin(null);
                    }
                  }}
                  options={bundleOptions}
                />
              </div>

              <div className="form-group">
                <label htmlFor="custom-vp">Custom VP Amount (Night Market / Radianite / Custom)</label>
                <div style={{ position: 'relative' }}>
                  <Coins size={20} className="search-icon" />
                  <input
                    id="custom-vp"
                    type="number"
                    className="input-field"
                    placeholder="Enter custom VP amount (e.g. 1775, 4350)..."
                    value={selectedSkin?.tierName === 'Custom' ? selectedSkin.cost : ''}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val > 0) {
                        setSelectedSkin({ 
                          name: `Custom Amount (${val.toLocaleString()} VP)`, 
                          cost: val, 
                          tierName: 'Custom', 
                          tierBadgeClass: 'tier-custom',
                          icon: null 
                        });
                        setSearch('');
                      } else {
                        setSelectedSkin(null);
                      }
                    }}
                    style={{ paddingLeft: '3.4rem' }}
                  />
                </div>
                {/* Quick VP Add Buttons */}
                <div className="quick-vp-row">
                  {[875, 1275, 1775, 2175, 2340, 2475, 3400, 4350, 5100, 7100, 8700].map(amt => (
                    <button
                      key={amt}
                      className="quick-vp-chip"
                      onClick={() => {
                        setSelectedSkin({
                          name: `Custom (${amt.toLocaleString()} VP)`,
                          cost: amt,
                          tierName: 'Custom',
                          tierBadgeClass: 'tier-custom',
                          icon: null
                        });
                      }}
                    >
                      {amt.toLocaleString()} VP
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Regional & Currency Selectors */}
          <div className="form-group region-divider">
            <label htmlFor="account-region">Account Store Region</label>
            <CustomSelect 
              id="account-region"
              value={accountRegion}
              onChange={handleAccountRegionChange}
              options={Object.values(regions).map(r => ({ value: r.id, label: r.name }))}
            />
            <small className="help-text">
              Select the region your Valorant account is registered in to match official VP store pack prices.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="pay-currency">Display / Payment Currency</label>
            <CustomSelect 
              id="pay-currency"
              value={payCurrency}
              onChange={setPayCurrency}
              options={Object.keys(exchangeRatesToUSD).map(code => ({ value: code, label: `${code} - ${formatCurrency(1, code).replace(/[0-9.,\s]/g, '')}` }))}
            />
            <small className="help-text">
              Real-time converted total in your preferred payment currency.
            </small>
          </div>
        </section>

        {/* RESULT CALCULATION PANEL */}
        <section className="panel result-panel">
          {selectedSkin && calculationResult ? (
            <div className="result-card">
              <div className="skin-preview">
                {selectedSkin.icon ? (
                  <div className="skin-preview-img-wrap">
                    <img src={selectedSkin.icon} alt={selectedSkin.name} />
                  </div>
                ) : (
                  <div className="skin-preview-icon-fallback">
                    {selectedSkin.isVCT ? <Trophy size={48} color="#FFD700" /> : <Shield size={48} color="var(--accent-red)" />}
                  </div>
                )}
                <div className="skin-title">{selectedSkin.name}</div>
                <div className="skin-badges-row">
                  <span className={`tier-badge-pill ${selectedSkin.tierBadgeClass || 'tier-select'}`}>
                    {selectedSkin.tierName}
                  </span>
                  {selectedSkin.weapon && (
                    <span className="weapon-category-pill">{selectedSkin.weapon}</span>
                  )}
                  {selectedSkin.tag && (
                    <span className="special-tag-pill">{selectedSkin.tag}</span>
                  )}
                </div>
              </div>

              <div className="cost-summary">
                <div className="cost-box">
                  <span className="cost-label">Target VP</span>
                  <span className="cost-value highlight">{selectedSkin.cost.toLocaleString()} VP</span>
                </div>
                <div className="cost-box" style={{textAlign: 'right'}}>
                  <span className="cost-label">Estimated Cash</span>
                  <span className="cost-value text-glow">
                    {formatCurrency(calculationResult.convertedTotal, payCurrency)}
                  </span>
                </div>
              </div>

              <div className="vp-packs">
                <div className="vp-packs-header">
                  <h3>Cheapest Pack Combination</h3>
                  <button 
                    className="copy-summary-btn"
                    onClick={handleCopySummary}
                    title="Copy calculation summary"
                  >
                    {copied ? <Check size={15} color="#2ecc71" /> : <Copy size={15} />}
                    <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                  </button>
                </div>

                <div className="packs-list">
                  {calculationResult.combination.map((pack, idx) => (
                    <div key={idx} className="pack-item">
                      <div className="pack-left">
                        <div className="pack-count-badge">{pack.count}x</div>
                        <div className="pack-vp">
                          <Coins size={16} className="vp-icon" />
                          <span>{pack.vp.toLocaleString()} VP</span>
                        </div>
                      </div>
                      <div className="pack-cost">
                        {formatCurrency(pack.convertedCost * pack.count, payCurrency)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="alert-box">
                  <AlertCircle size={20} className="alert-icon" />
                  <p>
                    Purchasing these packs awards <strong>{calculationResult.totalVP.toLocaleString()} VP</strong>. 
                    After buying <em>{selectedSkin.name}</em>, you will have <strong className="vp-leftover">{calculationResult.totalVP - selectedSkin.cost} VP</strong> remaining in your account.
                  </p>
                </div>

                <button 
                  className="reset-selection-btn"
                  onClick={() => {
                    setSelectedSkin(null);
                    setSearch('');
                  }}
                >
                  Calculate Another Item
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon-wrap">
                <Calculator size={56} />
              </div>
              <h2>Calculate VP & Cash Needed</h2>
              <p>Select a purchasable gun skin, active VCT team capsule, or custom VP to find the cheapest VP pack combination.</p>
              
              <div className="empty-features-grid">
                <div className="empty-feature">
                  <Shield size={18} color="var(--accent-red)" />
                  <span><strong>900+ Purchasable Store Skins</strong> (Battlepass & expired items excluded)</span>
                </div>
                <div className="empty-feature">
                  <Trophy size={18} color="#FFD700" />
                  <span><strong>Active VCT Team Capsules</strong> (SEN, PRX, FNC, G2, GEN, TH & more)</span>
                </div>
                <div className="empty-feature">
                  <Coins size={18} color="#2ecc71" />
                  <span><strong>Multi-Region Store Pricing</strong> (NA, EU, UK, AP, MY, ID, JP, CAD, AUD)</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="valx-footer">
        <p>ValX isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties.</p>
      </footer>
    </div>
  );
}

export default App;
