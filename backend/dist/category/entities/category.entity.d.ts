import { Video } from "../../video/entities/video.entity";
export declare class FirstLevelCategory {
    id: string;
    name: string;
    alias: string;
    secondLevelCategory: SecondLevelCategory[];
}
export declare class SecondLevelCategory {
    id: string;
    name: string;
    alias: string;
    firstLevelCategory: FirstLevelCategory;
    firstLevelId: string;
    videos: Video[];
}
