import React, {useEffect, useState} from 'react';

import {Button, Card, Container, Form, Row} from "react-bootstrap"; import {createPost, deletePost, getPosts} from "../http/postApi";
import {CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle} from "@coreui/react";

const Main = () => {

const [title, setTitle] = useState('') const [body, setBody] = useState('') const [posts, setPosts] = useState([])

useEffect( () => { getPosts().then(res => {
setPosts(res.data.data)
})
}, [])

let deletePosts = async (id) => { let isOk = await deletePost(id); if (isOk){
setPosts(posts.filter(post => post.id !== id));
}
}

let click = async () => {
await createPost(title, body); setTitle('')
setBody('') getPosts().then(res => {
setPosts(res.data.data)
})
}

return (
<div>
<Container
className="d-flex justify-content-center align-items-center mt-3"
>
<Card style={{width: 800}} className="p-5">
<Form>
<h1 className="text-center">Add Post</h1>
<Form.Group className="mb-3"
controlId="exampleForm.ControlInput1">
<Form.Label>Email address</Form.Label>
 
<Form.Control type="email" value={title} onChange={e
=> setTitle(e.target.value)} placeholder="Enter a title..." />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
<Form.Label>Example textarea</Form.Label>
<Form.Control as="textarea" value={body} onChange={e
=> setBody(e.target.value)} rows={3} placeholder="Enter a body..." />
</Form.Group>
<Button className="w-100" variant="outline-secondary" onClick={() => { click()}}>Create</Button>
</Form>
</Card>
</Container>

{posts.length ? posts.map(post =>
<Container className="d-flex justify-content-center align-
items-center mt-3">
<CCard style={{width: 800}} className=" mt-2">

<CCardHeader>{`(${post.createdAt.slice(0, 10)}) Author: ${post.user.firstName} ${post.user.lastName}`}</CCardHeader>


<CCardBody>

<CCardTitle>{post.title}</CCardTitle>

<CCardText>{post.body}</CCardText>

 


More</CButton>
 
<div className="d-flex">
<CButton onClick={() => {}}>Read

<CButton className="ms-auto"
 
variant="outline" color="danger" onClick={() =>
{deletePosts(post.id)}}>Delete</CButton>
</div>

</CCardBody>

</CCard>
</Container>

)

:
<div></div>

}
 
</div>

);
};

export default Main;
import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap"; import {observer} from "mobx-react-lite";
import {useNavigate, useLocation, NavLink} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts"; import {login, registration} from "../http/userAPI";
import {Context} from "../index";

const Auth = observer(() => {
const {user} = useContext(Context) const location = useLocation() const navigate = useNavigate()
const isLogin = location.pathname === LOGIN_ROUTE const [email, setEmail] = useState('')
const [password, setPassword] = useState('') const [firstName, setFirstName] = useState('') const [lastName, setLastName] = useState('')

const click = async () => { try {
let data;
if (isLogin) {
data = await login(email, password);
} else {
data = await registration(firstName, lastName, email, password);
}
if(!data){
return;
}
user.setUser(user) user.setIsAuth(true) navigate(MAIN_ROUTE)
} catch (e) {
alert(e.response.data.message)
}

}

return (
<Container
className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 54}}
>
<Card style={{width: 600}} className="p-5">
 
<h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
<Form className="d-flex flex-column">

{!isLogin ?
<div>
<Form.Control
className="mt-3" placeholder="First Name..." value={firstName}
onChange={e => setFirstName(e.target.value)}
/>
<Form.Control
className="mt-3" placeholder="Last Name..." value={lastName}
onChange={e => setLastName(e.target.value)}
/>

</div>

:
<></>

}
<Form.Control
className="mt-3" placeholder="Enter your email..." value={email}
onChange={e => setEmail(e.target.value)}
/>
<Form.Control
className="mt-3"
placeholder="Enter your password..." value={password}
onChange={e => setPassword(e.target.value)} type="password"
 


3">
 
/>
<Row className="d-flex justify-content-between mt-3 pl-3 pr-

{isLogin ?
<div>
Don't have an account? <NavLink
 
to={REGISTRATION_ROUTE}>Create account!</NavLink>
</div>
:
<div>
Do you have an account
? <NavLink to={LOGIN_ROUTE}>Log in!</NavLink>
</div>
}
 
<Button
variant={"outline-success"} onClick={click}
>
{isLogin ? 'Login' : 'Registration'}
</Button>
</Row>

 




);
});
 
</Form>
</Card>
</Container>
 


export default Auth;
import React, {useContext} from 'react';
import {Card, Container, ListGroup} from "react-bootstrap"; import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Profile = observer(() => {

let {user} = useContext(Context).user;


return (
<Container	className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 40}}>

 


alt="Admin"
 
<Card style={{ width: '18rem' }}>
<img src="https://bootdey.com/img/Content/avatar/avatar6.png"

className="rounded-circle p-1 rounded mx-auto d-block"
 
width="110"/>


<ListGroup variant="flush">

 







);
});
 
<ListGroup.Item>Email: {user.email}</ListGroup.Item>
<ListGroup.Item>First Name: {user.firstName}</ListGroup.Item>
<ListGroup.Item>Last Name: {user.lastName}</ListGroup.Item>
</ListGroup>
</Card>
</Container>
 

export default Profile;
 
