
/**
 * Nuxco Environment API
 * Unified Runtime for Browser, Node, and Edge
 * Day 26: Environment API Lock
 */

export interface EnvConfig {
    mode: 'development' | 'production';
    ssr: boolean;
    base: string;
}

export class NuxcoEnv {
    private static instance: NuxcoEnv;
    public config: EnvConfig;
    private listeners: Function[] = [];

    private constructor(config: EnvConfig) {
        this.config = config;
    }

    static init(config: EnvConfig): NuxcoEnv {
        if (!NuxcoEnv.instance) {
            NuxcoEnv.instance = new NuxcoEnv(config);
        }
        return NuxcoEnv.instance;
    }

    static get(): NuxcoEnv {
        if (!NuxcoEnv.instance) {
            throw new Error('NuxcoEnv not initialized');
        }
        return NuxcoEnv.instance;
    }

    /**
     * Unified HMR Listener
     * Works on Browser (WebSocket) or Server (EventBus/ProcessSignal)
     */
    onHMR(callback: (payload: any) => void) {
        this.listeners.push(callback);
    }

    /**
     * Trigger HMR (Called by Dev Server or WebSocket Client)
     */
    triggerHMR(payload: any) {
        this.listeners.forEach(fn => fn(payload));
    }
}
