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
  getStatus: () => string;
  activeGroup: Group;
  setActiveGroup: (group: Group) => void;
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
  const [groups, setGroups] = useState([
    { _id: 1, name: "Избранное", removable: false },
  ]);

  const [activeGroupName, setActiveGroupName] = useState(null);
  const [status, setStatus] = useState(0);

  const getStatus = useCallback(() => statusCodes[status], [status]);

  const isGroupExists = useCallback(
    (newGroupName: string) =>
      groups.find((e) => e.name.toLowerCase() === newGroupName.toLowerCase()),
    [groups]
  );

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
    activeGroupName,
    setActiveGroupName,
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
