enum PetJournalPermission {
    // Users
    PermissionsUsersView = 900,
    PermissionsUsersCreate = 901,
    PermissionsUsersEdit = 902,
    PermissionsUsersDelete = 903,
    PermissionsUsersExport = 904,
    PermissionsUsersSearch = 905,

    // SuperAdmin
    PermissionsAccessAll = 9998,
}

export default PetJournalPermission;


export function MapPermission(value: number): string {
    for (const key in PetJournalPermission) {
        if ((PetJournalPermission as any)[key] === value) {
            return key;
        }
    }
    return "";
}