import React, { useCallback, useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Plus, PeopleFill } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import './Style.css';
import { Button } from "react-bootstrap";
import { IUsers } from "../schemas/users";
import { LocalData } from "../const/common";
import UserCard from "./UserCard";
import data from "../assets/data.json"

const Dashboard: React.FunctionComponent = () => {
    const [isAddClicked, setIsAddClicked] = useState<boolean>(false);
    const [allUsers, setAllUsers] = useState<IUsers[]>([]);
    const [selectedUser, setSelectedUser] = useState<IUsers>({});
    const [addedUsers, setAddedUsers] = useState<IUsers[]>([]);
    const [viewAll, setViewAll] = useState<boolean>(false);

    useEffect(() => {
        const allDataString = localStorage.getItem(LocalData.AllUsers);
        if (allDataString) {
            setAllUsers(JSON.parse(allDataString));
        } else {
            setAllUsers(data);
        }
        const allAddedUserString = localStorage.getItem(LocalData.AddedUsers) || "[]";
        setAddedUsers(JSON.parse(allAddedUserString));
    }, []);


    const onAddUserClick = useCallback(() => {
        setIsAddClicked(true);
    }, []);

    const onAddUser = useCallback(() => {
        if (selectedUser && selectedUser.id) {
            const existingUsers = localStorage.getItem(LocalData.AddedUsers);
            if (existingUsers) {
                const parsedUsers = JSON.parse(existingUsers);
                const updatedUsers = [...parsedUsers, selectedUser];
                localStorage.setItem(LocalData.AddedUsers, JSON.stringify(updatedUsers));
                setAddedUsers(updatedUsers);
                setSelectedUser({});
            } else {
                localStorage.setItem(LocalData.AddedUsers, JSON.stringify([selectedUser]));
                setAddedUsers([selectedUser]);
                setSelectedUser({});
            }
        }
    }, [selectedUser]);

    const onDropdownChange = useCallback((e) => {
        if (e.target.value) {
            const currentUser = allUsers.find(_user => _user.id === parseInt(e.target.value)) || {};
            setSelectedUser(currentUser);
        } else {
            setSelectedUser({});
        }
    }, [allUsers]);

    const onUserRemoveClick = useCallback((user: IUsers) => {
        const usersAfterDelete = addedUsers.filter(_user => _user.id !== user.id);
        setAddedUsers(usersAfterDelete);
        localStorage.setItem(LocalData.AddedUsers, JSON.stringify(usersAfterDelete));
    }, [allUsers, addedUsers]);

    const onViewAllClick = useCallback(() => {
        setViewAll(true);
    }, []);

    const remainingUsers = addedUsers && addedUsers.length ?
        allUsers.filter(user => addedUsers.every(_usr => _usr.id !== user.id)) : allUsers;
    const usersList = viewAll ? addedUsers : addedUsers && addedUsers.slice(0, 5);

    return (
        <Container>
            <Row>
                <Col xs={12} md={12} className="pageHeader">
                    <div className="pageTitle">Your Team</div>
                    <div className="headerRight">Team Page<PeopleFill size={15} /></div>
                </Col>
                <Col xs={12} md={6}>
                    {isAddClicked ? (
                        <div className="dropDownHolder">
                            <Form.Select className="dropDown" onChange={onDropdownChange}>
                                <option >Select user</option>
                                {remainingUsers && remainingUsers.map(_user => (
                                    <option value={_user.id} key={`${_user.id}`}>{_user.username}</option>
                                ))}
                            </Form.Select>
                            <Button variant="light" onClick={onAddUser}><Plus size={25} /></Button>
                        </div>
                    ) : (
                        <div className="addBtnHolder" onClick={onAddUserClick}>
                            <Plus size={25} /> Add team Member
                        </div>
                    )}
                </Col>
                {usersList && usersList.map(_user => (
                    <UserCard user={_user} onUserRemoveClick={onUserRemoveClick} key={`${_user.id}`} />
                ))}
                {(addedUsers?.length > 5 && !viewAll) && (
                    <Col xs={12} md={12}>
                        <Button
                            variant="light"
                            size="lg"
                            onClick={onViewAllClick}
                            className="viewAllBtn"
                        >
                            Show All
                        </Button>
                    </Col>
                )}

            </Row>
        </Container>
    )
}

export default Dashboard;