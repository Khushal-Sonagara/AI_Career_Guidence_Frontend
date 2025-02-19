import { Button } from '../../../ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import {
    BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList,
    BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar
} from 'react-simple-wysiwyg';
import { toast } from 'sonner';
import { AIChatSession } from '../../../../Services/AIModal';

function RichTextEditor({
    onRichTextEditorChange,
    index,
    defaultValue,
    fieldName,
    promptTemplate,
    fieldData
}) {
    const [value, setValue] = useState(defaultValue || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setValue(defaultValue || '');
    }, [defaultValue]);

    const GenerateContentFromAI = async () => {
        if (!fieldData) {
            toast('Missing required data for AI generation.');
            return;
        }

        let prompt = promptTemplate;
        for (const key in fieldData) {
            prompt = prompt.replace(`{${key}}`, fieldData[key] || '');
        }

        setLoading(true);
        try {
            const result = await AIChatSession.sendMessage(prompt);
            const respText = await result.response.text();

            let parsedResponse;
            try {
                parsedResponse = JSON.parse(respText);
                console.log("Parsed AI Response:", parsedResponse);
            } catch (error) {
                console.error("Error parsing AI response:", error);
                toast("Invalid response from AI.");
                setLoading(false);
                return;
            }

            let bulletPoints = [];

            /** Extract all possible bullet-point fields */
            const sections = [
                "keyContributions",
                "impact",
                "responsibilities",
                "requirements",
                "preferredQualifications",
                "benefits"
            ];

            sections.forEach(section => {
                if (Array.isArray(parsedResponse[section])) {
                    bulletPoints.push(...parsedResponse[section].map(point => point.trim()));
                }
            });

            // Extract from projectSummary if necessary
            if (parsedResponse.projectSummary) {
                sections.forEach(section => {
                    if (Array.isArray(parsedResponse.projectSummary[section])) {
                        bulletPoints.push(...parsedResponse.projectSummary[section].map(point => point.trim()));
                    }
                });
            }

            // If no valid bullet points were found
            if (bulletPoints.length === 0) {
                console.error("No valid bullet points found:", parsedResponse);
                toast("AI did not return bullet points in the expected format.");
                setLoading(false);
                return;
            }

            const formattedHTML = `
                <ul>
                    ${bulletPoints.map(point => `<li>${point}</li>`).join('')}
                </ul>
            `;

            setValue(formattedHTML);
            onRichTextEditorChange({ target: { value: formattedHTML } }, fieldName, index);
        } catch (error) {
            toast('Failed to generate content');
            console.error("AI Request Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex justify-between my-2'>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={GenerateContentFromAI}
                    disabled={loading}
                    className="flex gap-2 border-primary"
                    style={{ color: 'black' }} // Ensure black text
                >
                    {loading ? <LoaderCircle className='animate-spin' /> : <><Brain className='h-4 w-4' /> Generate from AI</>}
                </Button>
            </div>
            <EditorProvider>
                <Editor
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onRichTextEditorChange(e, fieldName, index);
                    }}
                    dangerouslySetInnerHTML={{ __html: value }} // Ensures bullet points are rendered
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
