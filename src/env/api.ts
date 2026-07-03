
/**
 * Nuxc Environment API
 * Unified Runtime for Browser, Node, and Edge
 * Day 26: Environment API Lock
 */

export interface EnvConfig {
    mode: 'development' | 'production';
    ssr: boolean;
    base: string;
}

export class NuxcEnv {
    private static instance: NuxcEnv;
    public config: EnvConfig;
    private listeners: Function[] = [];

    private constructor(config: EnvConfig) {
        this.config = config;
    }

    static init(config: EnvConfig): NuxcEnv {
        if (!NuxcEnv.instance) {
            NuxcEnv.instance = new NuxcEnv(config);
        }
        return NuxcEnv.instance;
    }

    static get(): NuxcEnv {
        if (!NuxcEnv.instance) {
            throw new Error('NuxcEnv not initialized');
        }
        return NuxcEnv.instance;
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
