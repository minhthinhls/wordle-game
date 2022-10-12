import {createMomentFromDate} from "@/utils";

export default <
    InstanceA extends {[p: string]: any},
    InstanceB extends {[p: string]: any}
>(createdAtKey = "createdAt", updatedAtKey = "updatedAt") => (_InstanceA: InstanceA, _InstanceB: InstanceB) => {
    const {[createdAtKey]: _1st_InstanceCreated, [updatedAtKey]: _1st_InstanceUpdated} = _InstanceA;
    const {[createdAtKey]: _2nd_InstanceCreated, [updatedAtKey]: _2nd_InstanceUpdated} = _InstanceB;
    if (!_1st_InstanceUpdated && !_2nd_InstanceUpdated) {
        return createMomentFromDate(_1st_InstanceCreated).isSameOrAfter(createMomentFromDate(_2nd_InstanceCreated)) ? -1 : 1;
    }
    if (_1st_InstanceUpdated && !_2nd_InstanceUpdated) {
        return createMomentFromDate(_1st_InstanceUpdated).isSameOrAfter(createMomentFromDate(_2nd_InstanceCreated)) ? -1 : 1;
    }
    if (!_1st_InstanceUpdated && _2nd_InstanceUpdated) {
        return createMomentFromDate(_1st_InstanceCreated).isSameOrAfter(createMomentFromDate(_2nd_InstanceUpdated)) ? -1 : 1;
    }
    return createMomentFromDate(_1st_InstanceUpdated).isSameOrAfter(createMomentFromDate(_2nd_InstanceUpdated)) ? -1 : 1;
};
