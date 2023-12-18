'use client';
import {SearchIcon} from "@/components/shared/icons/SearchIcon";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React, {useState} from "react";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/react";

export default function FilterComponent({placeholder}: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('searchTerm')?.toString() || '');
    const [periodFrom, setPeriodFrom] = useState<string>(searchParams.get('periodFrom')?.toString() || '');
    const [periodTo, setPeriodTo] = useState<string>(searchParams.get('periodTo')?.toString() || '');

    function handleSearch() {
        const params = new URLSearchParams(searchParams);
        if (searchTerm && searchTerm.length > 3) {
            params.set('searchTerm', searchTerm);
        } else {
            params.delete('searchTerm');
        }

        if (periodFrom) {
            params.set('periodFrom', periodFrom);
        } else {
            params.delete('periodFrom');
        }

        if (periodTo) {
            params.set('periodTo', periodTo);
        } else {
            params.delete('periodTo');
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="w-full sm:max-w-[64%]">
            <div className="grid grid-cols-5 gap-4">
                <div className="relative flex flex-1 flex-shrink-0">
                    <Input
                        placeholder={placeholder}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                        value={searchTerm}
                        size="sm"
                        variant="bordered"
                        startContent={<SearchIcon/>}
                    />
                </div>

                <div className="relative flex flex-1 flex-shrink-0">
                    <Input
                        type="date"
                        size="sm"
                        placeholder="Period From"
                        onChange={(e) => {
                            setPeriodFrom(e.target.value);
                        }}
                        variant="bordered"
                        value={periodFrom}
                    />
                </div>

                <div className="relative flex flex-1 flex-shrink-0">
                    <Input
                        type="date"
                        size="sm"
                        placeholder="Period To"
                        onChange={(e) => {
                            setPeriodTo(e.target.value);
                        }}
                        variant="bordered"
                        value={periodTo}
                    />
                </div>

                <div className="relative flex flex-1 flex-shrink-0">
                    <Button
                        className="mt-1"
                        color={"primary"}
                        onClick={handleSearch}>
                        Filter
                    </Button>
                </div>

            </div>
        </div>
    );
}
