
/**
 * Nuce Environment API
 * Unified Runtime for Browser, Node, and Edge
 * Day 26: Environment API Lock
 */

export interface EnvConfig {
    mode: 'development' | 'production';
    ssr: boolean;
    base: string;
}

export class NuceEnv {
    private static instance: NuceEnv;
    public config: EnvConfig;
    private listeners: Function[] = [];

    private constructor(config: EnvConfig) {
        this.config = config;
    }

    static init(config: EnvConfig): NuceEnv {
        if (!NuceEnv.instance) {
            NuceEnv.instance = new NuceEnv(config);
        }
        return NuceEnv.instance;
    }

    static get(): NuceEnv {
        if (!NuceEnv.instance) {
            throw new Error('NuceEnv not initialized');
        }
        return NuceEnv.instance;
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
