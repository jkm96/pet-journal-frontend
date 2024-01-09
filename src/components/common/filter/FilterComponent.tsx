'use client';
import {SearchIcon} from "@/components/shared/icons/SearchIcon";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React, {useCallback, useEffect, useState} from "react";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/react";

interface FilterComponentProps {
    onFilterChange?: (searchTerm: string, periodFrom: string, periodTo: string) => void;
    placeholder: string;
}

export default function FilterComponent({onFilterChange, placeholder}: FilterComponentProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [periodFrom, setPeriodFrom] = useState<string>('');
    const [periodTo, setPeriodTo] = useState<string>('');
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleFilterChange = useCallback(
        (newSearchTerm: string, newPeriodFrom: string, newPeriodTo: string) => {
            if (onFilterChange) {
                onFilterChange(newSearchTerm, newPeriodFrom, newPeriodTo);
            }
        },
        [onFilterChange]
    );

    const handleFilterSearch = useCallback(() => {
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
            handleFilterChange(searchTerm, periodFrom, periodTo);
        }, 500);

        setDebounceTimeout(newTimeout);
    }, [searchTerm, periodFrom, periodTo, searchParams, pathname, replace, debounceTimeout, handleFilterChange]);

    useEffect(() => {
        setDisabled(searchTerm === '' && periodTo === '' && periodFrom === '');
    }, [searchTerm, periodFrom, periodTo]);

    return (
        <div className="md:grid md:grid-cols-5 md:gap-4">
            <div className="relative flex flex-1 lg:flex-shrink-0">
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

            <div className="grid grid-cols-2 md:mt-0 mt-2">
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

                <div className="relative flex flex-1 flex-shrink-0 ml-2">
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
            </div>

            <div className="relative flex flex-1 flex-shrink-0">
                <Button
                    className="mt-1"
                    disabled={disabled}
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
    );
}
