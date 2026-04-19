import { useState, useEffect, useMemo, useRef } from 'react';
import { Search, ChevronDown, Coins, Calculator, AlertCircle, ShoppingCart, Sparkles } from 'lucide-react';
import { regions } from './data/regions';
import { exchangeRatesToUSD, formatCurrency, convertCurrency } from './data/currencies';
import { tierCosts } from './data/tiers';
import { isBattlepassSkin } from './data/battlepass';
import { calculateBestVPPacks } from './utils/vpCalculator';
import './index.css';

const CustomSelect = ({ id, value, onChange, options }) => {
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
        <span>{selectedOption ? selectedOption.label : 'Select...'}</span>
        <ChevronDown size={20} className={`chevron ${isOpen ? 'open' : ''}`} />
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
  const [calcMode, setCalcMode] = useState('skin');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        const response = await fetch('https://valorant-api.com/v1/weapons/skins');
        const data = await response.json();
        
        const validSkins = data.data
          .filter(skin => skin.contentTierUuid) // Must have a tier
          .filter(skin => !isBattlepassSkin(skin.displayName)) // Exclude battlepass
          .map(skin => ({
            uuid: skin.uuid,
            name: skin.displayName,
            icon: skin.displayIcon || skin.chromas?.[0]?.displayIcon,
            tier: skin.contentTierUuid,
            cost: tierCosts[skin.contentTierUuid]?.cost || 0,
            tierName: tierCosts[skin.contentTierUuid]?.name || 'Unknown'
          }))
          .filter(skin => skin.cost > 0) // Only skins with known costs
          .sort((a, b) => a.name.localeCompare(b.name));
          
        setSkins(validSkins);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch skins:', error);
        setLoading(false);
      }
    };
    
    fetchSkins();
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

  const filteredSkins = useMemo(() => {
    if (!search) return skins.slice(0, 50);
    const lowerSearch = search.toLowerCase();
    return skins.filter(s => s.name.toLowerCase().includes(lowerSearch)).slice(0, 50);
  }, [search, skins]);

  const bundleOptions = [
    { value: '', label: 'Select a bundle tier...' },
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

  const handleAccountRegionChange = (newReg) => {
    setAccountRegion(newReg);
    if (regions[newReg]) {
      setPayCurrency(regions[newReg].currencyCode);
    }
  };

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

  return (
    <div className="website-container">
      <header>
        <h1>Valorant <span>Cash</span></h1>
        <p>
          <Sparkles size={18} color="var(--accent-red)" />
          Calculate the exact amount of currency needed for your dream skins
        </p>
      </header>

      <main className="main-content">
        <section className="panel controls-panel">
          <div className="tabs-container">
            <button 
              className={`tab-btn ${calcMode === 'skin' ? 'active' : ''}`}
              onClick={() => {
                setCalcMode('skin');
                if (selectedSkin?.tierName === 'Bundle' || selectedSkin?.tierName === 'Custom') {
                  setSelectedSkin(null);
                  setSearch('');
                }
              }}
            >
              Weapon Skin
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
              Bundle / Custom
            </button>
          </div>

          {calcMode === 'skin' && (
            <div className="form-group">
              <label htmlFor="skin-search">Search Skin</label>
            <div className="search-container" ref={dropdownRef}>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  id="skin-search"
                  type="text"
                  className="input-field"
                  placeholder={loading ? "Loading skins..." : "E.g. Prime Vandal"}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  style={{ paddingLeft: '3.5rem' }}
                  disabled={loading}
                />
              </div>
              
              {isDropdownOpen && !loading && (
                <div className="dropdown-list">
                  {filteredSkins.length > 0 ? (
                    filteredSkins.map(skin => (
                      <div key={skin.uuid} className="dropdown-item" onClick={() => handleSkinSelect(skin)}>
                        {skin.icon ? <img src={skin.icon} alt={skin.name} /> : <div style={{width: 60, height: 20, background: '#333'}}></div>}
                        <div className="skin-info">
                          <span className="skin-name">{skin.name}</span>
                          <span className="skin-cost">{skin.cost} VP ({skin.tierName})</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="dropdown-item" style={{justifyContent: 'center', color: 'var(--text-secondary)'}}>
                      No skins found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          )}

          {calcMode === 'bundle' && (
            <>
              <div className="form-group">
                <label htmlFor="bundle-select">Bundle Tier</label>
            <CustomSelect 
              id="bundle-select"
              value={selectedSkin?.tierName === 'Bundle' ? selectedSkin.cost : ''}
              onChange={(val) => {
                if (val) {
                  const label = bundleOptions.find(o => o.value === val)?.label.split(' (')[0] || 'Bundle';
                  setSelectedSkin({ name: label, cost: val, tierName: 'Bundle', icon: null });
                  setSearch('');
                } else {
                  setSelectedSkin(null);
                }
              }}
              options={bundleOptions}
            />
          </div>

          <div className="form-group">
            <label htmlFor="custom-vp">Custom VP Amount (Night Market)</label>
            <div style={{ position: 'relative' }}>
              <Coins size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                id="custom-vp"
                type="number"
                className="input-field"
                placeholder="Enter custom VP..."
                value={selectedSkin?.tierName === 'Custom' ? selectedSkin.cost : ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val > 0) {
                    setSelectedSkin({ name: 'Custom Amount', cost: val, tierName: 'Custom', icon: null });
                    setSearch('');
                  } else {
                    setSelectedSkin(null);
                  }
                }}
                style={{ paddingLeft: '3.5rem' }}
              />
            </div>
          </div>
          </>
          )}

          <div className="form-group" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <label htmlFor="account-region">Account Region (VP Store)</label>
            <CustomSelect 
              id="account-region"
              value={accountRegion}
              onChange={handleAccountRegionChange}
              options={Object.values(regions).map(r => ({ value: r.id, label: r.name }))}
            />
            <small style={{display: 'block', marginTop: '0.5rem', color: 'var(--text-secondary)'}}>
              Select the region your Valorant account is registered in.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="pay-currency">Payment Currency</label>
            <CustomSelect 
              id="pay-currency"
              value={payCurrency}
              onChange={setPayCurrency}
              options={Object.keys(exchangeRatesToUSD).map(code => ({ value: code, label: code }))}
            />
            <small style={{display: 'block', marginTop: '0.5rem', color: 'var(--text-secondary)'}}>
              Select the currency you want to pay in.
            </small>
          </div>
        </section>

        <section className="panel result-panel">
          {selectedSkin && calculationResult ? (
            <div className="result-card">
              <div className="skin-preview">
                {selectedSkin.icon && <img src={selectedSkin.icon} alt={selectedSkin.name} />}
                <div className="skin-title">{selectedSkin.name}</div>
                <div style={{color: 'var(--text-secondary)'}}>{selectedSkin.tierName} Edition</div>
              </div>

              <div className="cost-summary">
                <div className="cost-box">
                  <span className="cost-label">Target VP</span>
                  <span className="cost-value highlight">{selectedSkin.cost} VP</span>
                </div>
                <div className="cost-box" style={{textAlign: 'right'}}>
                  <span className="cost-label">Total Cost</span>
                  <span className="cost-value">{formatCurrency(calculationResult.convertedTotal, payCurrency)}</span>
                </div>
              </div>

              <div className="vp-packs">
                <h3>Recommended Packs</h3>
                {calculationResult.combination.map((pack, idx) => (
                  <div key={idx} className="pack-item">
                    <div className="pack-left">
                      <div className="pack-count">{pack.count}x</div>
                      <div className="pack-vp">
                        <Coins size={16} style={{display: 'inline', marginRight: 4, verticalAlign: 'text-bottom', color: 'var(--accent-red)'}} />
                        {pack.vp} VP
                      </div>
                    </div>
                    <div className="pack-cost">
                      {formatCurrency(pack.convertedCost * pack.count, payCurrency)}
                    </div>
                  </div>
                ))}
                
                <div className="alert-box">
                  <AlertCircle size={20} color="var(--accent-red)" style={{flexShrink: 0, marginTop: 2}} />
                  <p>
                    You will receive a total of <strong>{calculationResult.totalVP} VP</strong>. 
                    After purchasing {selectedSkin.name}, you will have <strong>{calculationResult.totalVP - selectedSkin.cost} VP</strong> remaining.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <Calculator size={64} />
              <h2>Calculate Skin Cost</h2>
              <p>Search and select a skin from the panel to see the cheapest VP combination needed.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
