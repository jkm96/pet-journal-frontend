import {UserResponse} from "@/boundary/interfaces/user";
import {Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User} from "@nextui-org/react";
import Link from "next/link";
import {VerticalDotsIcon} from "@/components/shared/icons/VerticalDotsIcon";

export default function RenderUserCell(user: UserResponse, columnKey: string | number | bigint, statusColorMap: Record<string, "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined>) {
    // @ts-ignore
    const cellValue = user[columnKey];
    switch (columnKey) {
        case "createdAt":
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-small capitalize">{cellValue}</p>
                </div>
            );
        case "username":
            return (
                <User
                    className="text-bold text-small capitalize"
                    name={user.username}
                />
            );
        case "isActive":
            return (
                <Chip className="capitalize" color={statusColorMap[user.isActive ? 'active' : 'inactive']} size="sm" variant="flat">
                    {user.isActive ? 'active' : 'inactive'}
                </Chip>
            );
        case "isEmailVerified":
            return (
                <Chip className="capitalize" color={statusColorMap[user.isEmailVerified ? 'verified' : 'unverified']} size="sm" variant="flat">
                    {user.isEmailVerified ? 'verified' : 'unverified'}
                </Chip>
            );
        case "isSubscribed":
            return (
                <Chip className="capitalize" color={statusColorMap[user.isSubscribed ? 'yes' : 'no']} size="sm" variant="flat">
                    {user.isSubscribed ? 'yes' : 'no'}
                </Chip>
            );
        case "actions":
            return (
                <div className="relative flex justify-center items-center gap-2">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                                <VerticalDotsIcon className="text-default-300"/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem>
                                <Link href={`/dashboard/users/${user.id}`}>View</Link>
                            </DropdownItem>
                            <DropdownItem>Edit</DropdownItem>
                            <DropdownItem>Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            );
        default:
            return cellValue;
    }
}
