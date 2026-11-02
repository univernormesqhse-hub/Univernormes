// Génère les icônes vectorielles (lucide, licence ISC) en SVG statiques dans assets/icons.
// usage : node scripts/icons.mjs (depuis video/ pour résoudre react, react-dom et lucide-react)
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require = createRequire(process.cwd() + '/package.json');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const L = require('lucide-react');
const out = process.argv[2];
const names = ['ShieldCheck', 'HardHat', 'Leaf', 'ClipboardCheck', 'GraduationCap', 'Compass', 'Target', 'Eye', 'Gem', 'Handshake', 'Scale', 'Lightbulb', 'Users', 'Search', 'FileText', 'Workflow', 'Network', 'TriangleAlert', 'Lock', 'FireExtinguisher', 'Recycle', 'Factory', 'Gauge', 'ChartNoAxesCombined', 'RefreshCw', 'BadgeCheck', 'BookOpen', 'Presentation', 'MessageSquare', 'Phone', 'Mail', 'Globe', 'MapPin', 'ArrowRight', 'Check', 'Layers', 'Award', 'Briefcase', 'Building2', 'Route', 'Microscope', 'Droplets', 'Wind', 'Sprout', 'Zap', 'ListChecks', 'CalendarDays', 'Sparkles', 'HeartHandshake', 'Clock', 'BrainCircuit', 'Settings2', 'Gavel', 'ScrollText', 'UserCheck', 'Flag', 'CircleCheckBig', 'Quote'];
fs.mkdirSync(out, {recursive: true});
let n = 0;
for (const k of names) {
  const C = L[k];
  if (!C) { console.log('absent', k); continue; }
  const svg = renderToStaticMarkup(React.createElement(C, {size: 48, color: 'currentColor', strokeWidth: 1.5}));
  fs.writeFileSync(path.join(out, k + '.svg'), svg);
  n++;
}
console.log('icônes', n);
