import {Button} from "@nextui-org/button";
import {PlusIcon} from "@/components/shared/icons/PlusIcon";
import React from "react";

export function AddRecordFab(props: { onPress: () => void }) {
    const handleClick = () => {
        console.log("AddRecordFab button clicked");
        props.onPress();
    };
    return <div className="fixed bottom-4 right-4 md:hidden">
        <Button onPress={props.onPress}
                isIconOnly={true}
                color="primary"
                radius="full"
                variant="shadow">
            <PlusIcon/>
        </Button>
    </div>;
}