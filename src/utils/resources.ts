import CONFIG from "@/config";

export const resolveResourceUrl = (src: string): string => {
    return `${CONFIG.serverHost}${src}`;
};

