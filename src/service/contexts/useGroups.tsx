import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Group } from "../../types/Group";

type TGroupsContext = {
  groups: Group[];
  addGroup: (newGroup: Group) => void;
  removeGroup: (group: Group) => void;
  renameGroup: (group: Group, newGroupName: string) => void;
  isGroupExists: (groupName: string) => boolean;
  lastId: number;
  getStatus: () => string;
  activeGroups: string[];
  isGroupActive: (group: string) => boolean;
  handleActiveGroup: (groups: string) => void;
  setActiveGroups: (groups: string[]) => void;
  isInGroup: (groups: string, group: string) => boolean;
  addGroupToGroups: (groups: string, group: string) => string;
  removeGroupFromGroups: (groups: string, group: string) => string;
  handleContactGroups: (groups: string, group: string) => string;
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

  const [activeGroups, setActiveGroups] = useState<string[]>([]);
  const [status, setStatus] = useState(0);

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
    (group) =>
      group.removable && setGroups(groups.filter((e) => e._id !== group._id)),
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
      }
    },
    [isGroupExists, setGroups, groups, setActiveGroups, activeGroups]
  );

  const isInGroup = useCallback(
    (groups, group) => groups.split(",").includes(group),
    []
  );

  const addGroupToGroups = useCallback(
    (groups, group) =>
      !isInGroup(groups, group)
        ? groups !== ""
          ? groups.split(",").concat([group]).join(",")
          : group
        : groups,
    [isInGroup]
  );

  const removeGroupFromGroups = useCallback(
    (groups, group) =>
      groups
        .split(",")
        .filter((e: string) => e !== group)
        .join(","),
    []
  );

  const handleContactGroups = useCallback(
    (groups, group) =>
      isInGroup(groups, group)
        ? removeGroupFromGroups(groups, group)
        : addGroupToGroups(groups, group),
    [isInGroup, removeGroupFromGroups, addGroupToGroups]
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
