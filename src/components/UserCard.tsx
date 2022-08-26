import React from "react";
import { Button, Col } from "react-bootstrap";
import { IUsers } from "../schemas/users";
import { XCircle } from 'react-bootstrap-icons';
import './Style.css';
import avatar from "../assets/avatar-default.png"
const UserCard: React.FunctionComponent<IProps> = (props) => {

    return (
        <Col xs={12} md={6} key={`${props.user?.id}`} className="userCard">
            <div>
                <img src={avatar} width="100px" className="profileImage" />
            </div>
            <div>
                <div>{props.user?.role}</div>
                <div>{props.user?.username}</div>
            </div>
            <div>
                <Button variant="light" className="closeBtn" onClick={(e) => props.onUserRemoveClick(props.user)}>
                    <XCircle size={20} /></Button>
            </div>
        </Col>
    )
}

export default UserCard;

interface IProps {
    user: IUsers;
    onUserRemoveClick: (user: IUsers) => void;
}