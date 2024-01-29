import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumb";
import TextIcon from "@/components/shared/icons/TextIcon";
import {Button, Chip} from "@nextui-org/react";
import {useState} from "react";
import BGColorIcon from "@/components/shared/icons/BGColorIcon";

type SectionVisibility = {
    textSection: boolean;
    backgroundSection: boolean;
};

const textColorOptions = ['darkviolet', 'deeppink', 'green', 'deepskyblue', 'orangered'];
const textFontFamilyOptions = ['Courier', 'sans-serif', 'Times-Bold', 'Times-Roman', 'Times-Italic'];
const textFontWeightOptions = ['thin', 'normal', 'medium', 'bold', 'ultrabold'];

export default function MagicStudio() {
    const [activeSection, setActiveSection] = useState<keyof SectionVisibility>('textSection');
    const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
        textSection: true,
        backgroundSection: false,
    });
    const [textColor, setTextColor] = useState<string>('');
    const [textFontFamily, setTextFontFamily] = useState<string>('');
    const [textFontWeight, setTextFontWeight] = useState<string>('');

    const handleElementsButtonClick = (sectionName: keyof SectionVisibility) => {
        setSectionVisibility({
            textSection: sectionName === 'textSection',
            backgroundSection: sectionName === 'backgroundSection',
        });
        setActiveSection(sectionName);
    };

    const handleColorButtonClick = (color: string) => {
        setTextColor(color);
    };

    const handleFontFamilyButtonClick = (fontFamily: string) => {
        setTextFontFamily(fontFamily);
    };

    const handleFontWeightButtonClick = (fontWeight: string) => {
        setTextFontWeight(fontWeight);
    };

    return (
        <>
            <Breadcrumb pageName="Magic Studio"/>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-1 bg-column-100 p-4">
                    <h2>Elements</h2>

                    <div className="text-center">
                        <Button isIconOnly
                                color="primary"
                                aria-label="Toggle textSection"
                                onClick={() => handleElementsButtonClick('textSection')}
                        >
                            <TextIcon width={30} height={30} color="#fff"/>
                        </Button>
                        <p>Text</p>
                    </div>

                    <div className="text-center mt-4">
                        <Button
                            isIconOnly
                            aria-label="Toggle backgroundSection"
                            onClick={() => handleElementsButtonClick('backgroundSection')}
                        >
                            <BGColorIcon width={30} height={30} color="#fff"/>
                        </Button>
                        <p>Background</p>
                    </div>
                </div>

                {/* Second Column */}
                <div className="col-span-2 p-4">
                    {activeSection === 'textSection' && (
                        <div className="">
                            <h3>Color</h3>
                            {textColorOptions.map((color, index) => (
                                <button
                                    key={index}
                                    className="m-1.5"
                                    onClick={() => handleColorButtonClick(color)}
                                >
                                    <Chip
                                        radius="sm"
                                        size="lg"
                                        variant="solid"
                                        style={{backgroundColor: color}}
                                    />
                                </button>
                            ))}

                            <h3>Font Family</h3>
                            {textFontFamilyOptions.map((font, index) => (
                                <button
                                    key={index}
                                    className="m-1.5"
                                    onClick={() => handleFontFamilyButtonClick(font)}
                                >
                                    <p style={{ fontFamily: font}}>Text</p>
                                </button>
                            ))}

                            <h3>Font Weight</h3>
                            {textFontWeightOptions.map((fontWeight, index) => (
                                <button
                                    key={index}
                                    className="m-1.5"
                                    onClick={() => handleFontWeightButtonClick(fontWeight)}
                                >
                                    <p style={{ fontWeight: fontWeight}}>Text</p>
                                </button>
                            ))}
                        </div>
                    )}

                    {activeSection === 'backgroundSection' && (
                        <div>
                            <h3>Background Color</h3>
                        </div>
                    )}
                </div>

                {/* Third Column */}
                <div className="col-span-9 bg-column-100 p-4">
                    {/* Your content for the third column */}
                    <p style={{color: textColor,fontFamily: textFontFamily, fontWeight:textFontWeight}}>This text has the selected color.</p>
                </div>
            </div>
        </>
    )
}