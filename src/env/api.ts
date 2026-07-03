
/**
 * Zeptr Environment API
 * Unified Runtime for Browser, Node, and Edge
 * Day 26: Environment API Lock
 */

export interface EnvConfig {
    mode: 'development' | 'production';
    ssr: boolean;
    base: string;
}

export class ZeptrEnv {
    private static instance: ZeptrEnv;
    public config: EnvConfig;
    private listeners: Function[] = [];

    private constructor(config: EnvConfig) {
        this.config = config;
    }

    static init(config: EnvConfig): ZeptrEnv {
        if (!ZeptrEnv.instance) {
            ZeptrEnv.instance = new ZeptrEnv(config);
        }
        return ZeptrEnv.instance;
    }

    static get(): ZeptrEnv {
        if (!ZeptrEnv.instance) {
            throw new Error('ZeptrEnv not initialized');
        }
        return ZeptrEnv.instance;
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
