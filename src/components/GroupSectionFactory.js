import GroupMembers from "./GroupMember";
import GroupSettlement from "./GroupSettlement";

const GroupSectionFactory = ({id, ...props}) => {

    const groupSectionById = {
        0: (<GroupSettlement {...props} />),
        1: (<GroupMembers {...props} />)
    }

    return groupSectionById[id] || (<div>Hello</div>);

}

export default GroupSectionFactory;