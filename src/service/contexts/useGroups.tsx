import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Group } from "../../types/Group";
import { useContactBook } from "./useContactBook";

type TGroupsContext = {
  groups: Group[];
  addGroup: (newGroup: Group) => void;
  removeGroup: (group: Group) => void;
  renameGroup: (group: Group, newGroupName: string) => void;
  isGroupExists: (groupName: string) => boolean;
  lastId: number;
  getStatus: () => string;
  activeGroups: string[];
  isGroupActive: (groupId: string) => boolean;
  handleActiveGroup: (groups: string) => void;
  setActiveGroups: (groups: string[]) => void;
  isInGroup: (groupsId: string, groupId: string) => string;
  addGroupToGroups: (groupsId: string, groupId: string) => string;
  removeGroupFromGroups: (groupsId: string, groupId: string) => string;
  handleContactGroups: (groupsId: string, groupId: string) => string;
  removeGroupFromAllContacts: (groupId: string) => void;
  getGroupNameById: (groupId: string) => string | undefined;
  groupToEdit: Group;
  setGroupToEdit: (group: Group) => void;
};

const statusCodes: any = {
  1: "BUSY",
  0: "OK",
  2: "WAITING",
};

const GroupsContext = createContext<Partial<TGroupsContext>>({});

export const useGroups = () => useContext(GroupsContext);

export const GroupsContextProvider: React.FC = ({ children }) => {
  const [groups, setGroups] = useState<Group[]>(
    JSON.parse(
      localStorage.getItem("contactBookGroups") ||
        '[{"_id":1,"name":"Избранное","removable":false, "editable": false}]'
    )
  );

  const { contactBook, updateContactBook } = useContactBook();

  const [activeGroups, setActiveGroups] = useState<string[]>([]);
  const [status, setStatus] = useState(0);
  const [groupToEdit, setGroupToEdit] = useState<Group>({
    _id: 1,
    name: "Избранное",
    removable: false,
    editable: false,
  });

  const getStatus = useCallback(() => statusCodes[status], [status]);

  const isGroupExists = useCallback(
    (newGroupName: string) =>
      groups.some((e) => e.name.toLowerCase() === newGroupName.toLowerCase()),
    [groups]
  );

  const isGroupActive = useCallback(
    (groupName: string) => activeGroups.includes(groupName),
    [activeGroups]
  );

  const handleActiveGroup = useCallback(
    (groupName) =>
      isGroupActive(groupName)
        ? setActiveGroups(activeGroups.filter((e) => e !== groupName))
        : setActiveGroups(activeGroups.concat(groupName)),
    [activeGroups, setActiveGroups, isGroupActive]
  );

  const lastId = groups.length && groups[groups.length - 1]._id;

  useEffect(() => setStatus(0), [groups]);

  const addGroup = useCallback(
    (newGroup) =>
      isGroupExists(newGroup.name)
        ? setStatus(1)
        : setGroups(groups.concat(newGroup)),
    [groups, isGroupExists]
  );

  const removeGroup = useCallback(
    (group) => setGroups(groups.filter((e) => e._id !== group._id)),
    [groups, setGroups]
  );

  const renameGroup = useCallback(
    (group, newGroupName) => {
      if (isGroupExists(newGroupName)) setStatus(1);
      else {
        setActiveGroups(
          activeGroups.map((e) => (e === group.name ? newGroupName : e))
        );
        setGroups(
          groups.map((e) =>
            e._id === group._id ? { ...e, name: newGroupName } : e
          )
        );
        setGroupToEdit({ ...group, name: newGroupName });
      }
    },
    [isGroupExists, setGroups, groups, setActiveGroups, activeGroups, setGroupToEdit]
  );

  const isInGroup = useCallback(
    (groupsId, groupId) => groupsId?.split(",").includes(groupId),
    []
  );

  const addGroupToGroups = useCallback(
    (groupsId, groupId) =>
      !isInGroup(groupsId, groupId)
        ? groupsId !== ""
          ? groupsId.split(",").concat([groupId]).join(",")
          : groupId
        : groupsId,
    [isInGroup]
  );

  const removeGroupFromGroups = useCallback(
    (groupsId, groupId) =>
      groupsId
        .split(",")
        .filter((e: string) => e !== groupId)
        .join(","),
    []
  );

  const handleContactGroups = useCallback(
    (groupsId, groupId) =>
      isInGroup(groupsId, groupId)
        ? removeGroupFromGroups(groupsId, groupId)
        : addGroupToGroups(groupsId, groupId),
    [isInGroup, removeGroupFromGroups, addGroupToGroups]
  );

  const removeGroupFromAllContacts = useCallback(
    (groupName) => {
      if (contactBook?.length)
        updateContactBook?.(
          contactBook!.map((contact) =>
            contact.groups
              ? {
                  ...contact,
                  groups: removeGroupFromGroups(contact.groups, groupName),
                }
              : contact
          )
        );
    },
    [contactBook, removeGroupFromGroups, updateContactBook]
  );

  const getGroupNameById = useCallback(
    (id) => groups.find((group) => group._id.toString() === id)?.name,
    [groups]
  );

  const value = {
    groups,
    getStatus,
    addGroup,
    removeGroup,
    renameGroup,
    isGroupExists,
    lastId,
    activeGroups,
    isGroupActive,
    handleActiveGroup,
    setActiveGroups,
    isInGroup,
    addGroupToGroups,
    removeGroupFromGroups,
    handleContactGroups,
    removeGroupFromAllContacts,
    getGroupNameById,
    groupToEdit,
    setGroupToEdit,
  };

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
};

export const PersistGroups = () => {
  const { groups } = useGroups();

  useEffect(() => {
    localStorage.setItem("contactBookGroups", JSON.stringify(groups));
  }, [groups]);

  return <></>;
};
