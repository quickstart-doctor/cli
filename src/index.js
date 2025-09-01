#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const main = async () => {
  // 1) Heurística mínima: ¿hay README? ¿contiene "Quickstart" o "Getting Started"?
  let hasQuickstart = false;
  try {
    const md = await readFile('README.md', 'utf8');
    hasQuickstart = /quickstart|get(ting)?\s*started/i.test(md);
  } catch {}

  const issues = [];
  if (!hasQuickstart) {
    issues.push('README sin sección de Quickstart / Getting Started');
  }

  // 2) Resultado
  if (issues.length === 0) {
    console.log('✅ Quickstart Doctor: OK');
    process.exit(0);
  } else {
    console.log('❌ Quickstart Doctor: problemas encontrados:');
    for (const i of issues) console.log(' -', i);
    process.exit(1);
  }
};

main().catch((e) => { console.error(e); process.exit(1); });
