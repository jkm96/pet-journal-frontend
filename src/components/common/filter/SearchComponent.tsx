'use client';
import {SearchIcon} from "@/components/shared/icons/SearchIcon";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent, useState} from "react";

interface SearchComponentProps {
    onSearchChange?: (newSearchTerm: string) => void;
    placeholder: string;
}
export default function SearchComponent({onSearchChange,placeholder}: SearchComponentProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        const params = new URLSearchParams(searchParams);
        if (newSearchTerm && newSearchTerm.length > 3) {
            params.set('searchTerm', newSearchTerm);
        } else {
            params.delete('searchTerm');
        }

        replace(`${pathname}?${params.toString()}`);

        if (onSearchChange && (newSearchTerm.length > 3 || newSearchTerm === '')) {
            onSearchChange(newSearchTerm);
        }
    }

    return (
        <div className="w-full sm:max-w-[44%]">
            <div className="relative flex flex-1 flex-shrink-0">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    placeholder={placeholder}
                    onChange={handleSearchChange}
                    defaultValue={searchParams.get('searchTerm')?.toString()}
                />
                <SearchIcon
                    className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            </div>
        </div>
    );
}