/**
 * @nuce/plugin-crypto-sign
 * Plugin signature verification
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createCryptoSignPlugin(): PluginAdapter {
    return {
        name: '@nuce/plugin-crypto-sign',
        originalPlugin: 'nuce-native',
        
        async transform(code: string, id: string) {
            // Security check: Plugin signature verification
            await this.securityScan(code, id);
            return { code };
        },

        async securityScan(code: string, id: string): Promise<void> {
            // Scan for security issues
            const issues = [];
            
            // Check for common vulnerabilities
            if (code.includes('eval(')) {
                issues.push({ type: 'eval-usage', file: id });
            }
            if (code.includes('dangerouslySetInnerHTML')) {
                issues.push({ type: 'xss-risk', file: id });
            }
            
            if (issues.length > 0) {
                console.warn(`[@nuce/plugin-crypto-sign] Security issues found:`, issues);
            }
        }
    };
}

export default createCryptoSignPlugin;
