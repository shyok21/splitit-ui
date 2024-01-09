import GroupBalance from "./GroupBalance";
import GroupMembers from "./GroupMember";
import GroupSettlement from "./GroupSettlement";

const GroupSectionFactory = ({id, ...props}) => {

    const groupSectionById = {
        0: (<GroupSettlement {...props} />),
        1: (<GroupMembers {...props} />),
        2: (<GroupBalance {...props} />)
    }

    return groupSectionById[id] || (<div>Hello</div>);

}

export default GroupSectionFactory;