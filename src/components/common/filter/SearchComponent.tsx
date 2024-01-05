'use client';
import {SearchIcon} from "@/components/shared/icons/SearchIcon";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function SearchComponent({placeholder}: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    function handleSearch(searchTerm: string) {
        const params = new URLSearchParams(searchParams);
        if (searchTerm && searchTerm.length > 3) {
            params.set('searchTerm', searchTerm);
        } else {
            params.delete('searchTerm');
        }
        replace(`${pathname}?${params.toString()}`);
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
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get('searchTerm')?.toString()}
                />
                <SearchIcon
                    className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            </div>
        </div>
    );
}