export type ColorName = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

type MoodColorMap = {
    [key: string]: ColorName;
};

const moodColorMap:MoodColorMap=  {
    "happy": "success",
    "playful": "secondary",
    "content": "default",
    "relaxed": "success",
    "excited": "success",
    "curious": "secondary",
    "sleepy": "secondary",
    "anxious": "warning",
    "stressed": "warning",
    "scared": "danger",
    "#playtime": "primary",
    "#firstwalk": "success",
    "#mealtime": "secondary",
    "#grooming": "warning",
};


type PdfColorMap = {
    [key: string]: PdfColorName;
};
export type PdfColorName = "#219653" | "#7722cb" | "#259AE6" | "#FFA70B" | "#da1028";
const PdfColorMap:PdfColorMap=  {
    "happy": "#219653",
    "playful": "#7722cb",
    "content": "#259AE6",
    "relaxed": "#219653",
    "excited": "#219653",
    "curious": "#7722cb",
    "sleepy": "#7722cb",
    "anxious": "#FFA70B",
    "stressed": "#FFA70B",
    "scared": "#da1028",
    "#playtime": "#259AE6",
    "#firstwalk": "#219653",
    "#mealtime": "#7722cb",
    "#grooming": "#FFA70B",
};

const getMoodColorClass = (mood: string): ColorName => {
    const moodArray = mood.split(',');
    const firstMood:string = moodArray.length > 0 ? moodArray[0].toLowerCase().trim() : "default";
    return moodColorMap[firstMood] || "primary";
};

const getMoodColorClassList = (moods: string[]): ColorName[] => {
    return moods.map(mood => {
        const trimmedMood = mood.toLowerCase().trim();
        return moodColorMap[trimmedMood] || "primary";
    });
};

const getPdfMoodColorClassList = (moods: string[]): PdfColorName[] => {
    return moods.map(mood => {
        const trimmedMood = mood.toLowerCase().trim();
        return PdfColorMap[trimmedMood] || "#259AE6";
    });
};

export {getMoodColorClass,getMoodColorClassList, getPdfMoodColorClassList}