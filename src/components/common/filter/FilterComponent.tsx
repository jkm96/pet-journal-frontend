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
    const [term, setTerm] = useState<string>(searchParams.get('query')?.toString() || '');
    const [periodFrom, setPeriodFrom] = useState<string>('');
    const [periodTo, setPeriodTo] = useState<string>('');

    function handleSearch() {
        const params = new URLSearchParams(searchParams);
        if (term && term.length > 3) {
            params.set('query', term);
        } else {
            params.delete('query');
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

    const isFilterApplied = term.length > 3 || (periodFrom && periodTo);

    return (
        <div className="w-full sm:max-w-[64%]">
            <div className="grid grid-cols-5 gap-4">
                <div className="relative flex flex-1 flex-shrink-0">
                    <Input
                        placeholder={placeholder}
                        onChange={(e) => {
                            setTerm(e.target.value);
                        }}
                        value={term}
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

                {isFilterApplied && (
                    <div className="relative flex flex-1 flex-shrink-0">
                        <Button
                            className="mt-1"
                            color={"primary"}
                            onClick={handleSearch}>
                            Filter
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
