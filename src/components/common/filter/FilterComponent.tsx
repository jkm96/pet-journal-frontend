'use client';
import {SearchIcon} from "@/components/shared/icons/SearchIcon";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React, {useState} from "react";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/react";

interface FilterComponentProps {
    onFilterChange?: (searchTerm: string, periodFrom: string, periodTo: string) => void;
    placeholder: string;
}

export default function FilterComponent({ onFilterChange,placeholder }: FilterComponentProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [periodFrom, setPeriodFrom] = useState<string>('');
    const [periodTo, setPeriodTo] = useState<string>('');
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    function handleFilterSearch() {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
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

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            if (onFilterChange) {
                onFilterChange(searchTerm, periodFrom, periodTo);
            }
        }, 500);

        setDebounceTimeout(newTimeout);
    }

    return (
        <div className="w-full">
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
                        color="primary"
                        onClick={(e) => {
                            e.preventDefault();
                            handleFilterSearch();
                        }}
                    >
                        Filter
                    </Button>
                </div>

            </div>
        </div>
    );
}
