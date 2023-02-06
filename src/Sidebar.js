import { useEffect, useState, memo, useRef } from 'react';
import SidebarChat from './SidebarChat';
import { Avatar, IconButton } from '@material-ui/core';
import { Message, PeopleAlt, Home, ExitToApp as LogOut, SearchOutlined, GetAppRounded, Add } from '@material-ui/icons';
import db, { auth, createTimestamp } from "./firebase";
import { useStateValue } from './StateProvider';
import { NavLink, Route, useHistory, Switch } from 'react-router-dom';
import algoliasearch from "algoliasearch";
import './Sidebar.css';
import audio from './notification.mp3'
import Modal from 'react-modal';
import './modal.css';

const customStyles = {
  content: {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');
const index = algoliasearch("XS6RQO7ASC", "7b6fe1a26eedae8fac0d4d3e112d03be").initIndex('whatsappy-app');

function Sidebar({ chats, pwa, rooms, fetchRooms, users, fetchUsers }) {
  const [searchList, setSearchList] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [menu, setMenu] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [{ user, page, pathID }] = useStateValue();
  let history = useHistory();
  const notification = new Audio(audio);
  const prevUnreadMessages = useRef((() => {
    const data = {};
    chats.forEach(cur => cur.unreadMessages || cur.unreadMessages === 0 ? data[cur.id] = cur.unreadMessages : null);
    return data;
  })());

  // let cabecalho;
  // let campo;
  // let botao_nao;
  // let botao_sim;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value);

  function openModal() {
    setIsOpen(true);
  }
  // function afterOpenModal() {
  //   setText("");
  //   // references are now sync'd and can be accessed.
  //   cabecalho.style.fontSize = '22px';
  //   campo.style.color = '#000';
  //   campo.style.width = '100%';
  //   campo.style.padding = '12px 20px';
  //   campo.style.margin = '8px 0';
  //   campo.style.boxSizing = 'border-box';
  //   campo.style.border = '2px solid #333333';
  //   campo.style.borderRadius = '5px';

  //   botao_nao.style.color = '#000';
  //   botao_nao.style.backgroundColor = '#555555'; /* Green */
  //   botao_nao.style.border = 'none';
  //   botao_nao.style.color = 'white';
  //   botao_nao.style.padding = '13px 29px';
  //   botao_nao.style.textAlign = 'center';
  //   botao_nao.style.textDecoration = 'none';
  //   botao_nao.style.display = 'inline-block';
  //   botao_nao.style.fontSize = '16px';
  //   botao_nao.style.borderRadius = '5px';
  //   botao_nao.style.marginRight = '8px';

  //   botao_sim.style.color = '#000';
  //   botao_sim.style.backgroundColor = '#4CAF50'; /* Green */
  //   botao_sim.style.border = 'none';
  //   botao_sim.style.color = 'white';
  //   botao_sim.style.padding = '13px 30px';
  //   botao_sim.style.textAlign = 'center';
  //   botao_sim.style.textDecoration = 'none';
  //   botao_sim.style.display = 'inline-block';
  //   botao_sim.style.fontSize = '16px';
  //   botao_sim.style.borderRadius = '5px';
  // }
  function closeModal() {
    setIsOpen(false);
  }


  var Nav;
  if (page.width > 760) {
    Nav = (props) =>
      <div className={`${props.classSelected ? "sidebar__menu--selected" : ""}`} onClick={props.click}>
        {props.children}
      </div>
  } else {
    Nav = NavLink;
  }

  async function search(e) {
    if (e) {
      document.querySelector(".sidebar__search input").blur();
      e.preventDefault();
    }
    if (page.width <= 760) {
      history.push("/search?" + searchInput);
    };
    setSearchList(null);
    if (menu !== 4) {
      setMenu(4)
    };
    const result = (await index.search(searchInput)).hits.map(cur => cur.objectID !== user.uid ? {
      ...cur,
      id: cur.photoURL ? cur.objectID > user.uid ? cur.objectID + user.uid : user.uid + cur.objectID : cur.objectID,
      userID: cur.photoURL ? cur.objectID : null
    } : null);
    //console.log(result);
    setSearchList(result);
  }

  const createChat = () => {
    openModal();
  };
  const generateChat = () => {
    closeModal();
    // const roomName = prompt("Type the name of your room");
    const roomName = text;
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        timestamp: createTimestamp(),
        lastMessage: "",
      });
    };
    
  };

  useEffect(() => {
    const data = {};
    chats.forEach(cur => {
      if (cur.unreadMessages || cur.unreadMessages === 0) {
        if ((cur.unreadMessages > prevUnreadMessages.current[cur.id] || !prevUnreadMessages.current[cur.id] && prevUnreadMessages.current[cur.id] !== 0) && pathID !== cur.id) {
          notification.play();
        };
        data[cur.id] = cur.unreadMessages;
      };
    });
    prevUnreadMessages.current = data;
  }, [chats, pathID]);

  useEffect(() => {
    if (page.width <= 760 && chats && !mounted) {
      setMounted(true);
      setTimeout(() => {
        document.querySelector('.sidebar').classList.add('side');
      }, 10);
    };
  }, [chats, mounted]);

  return (
    <div className="sidebar" style={{
      minHeight: page.width <= 760 ? page.height : "auto"
    }}>
      <div className="sidebar__header">
        <div className="sidebar__header--left">
          <Avatar src={user?.photoURL} />
          <h4>{user?.displayName} </h4>
        </div>
        <div className="sidebar__header--right">
          {/* <IconButton onClick={() => {
            if (pwa) {
              console.log("prompting the pwa event")
              pwa.prompt()
            } else {
              console.log("pwa event is undefined")
            }
          }} >
            <GetAppRounded />
          </IconButton> */}
          <IconButton onClick={() => {
            auth.signOut();
            db.doc('/users/' + user.uid).set({ state: "offline" }, { merge: true });
            history.replace("/chats")
          }} >
            <LogOut />
          </IconButton>

        </div>
      </div>

      <div className="sidebar__search">
        <form className="sidebar__search--container">
          <SearchOutlined />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for users or rooms"
            type="text"
          />
          <button style={{ display: "none" }} type="submit" onClick={search}></button>
        </form>
      </div>

      <div className="sidebar__menu">
        <Nav
          classSelected={menu === 1 ? true : false}
          to="/chats"
          click={() => setMenu(1)}
          activeClassName="sidebar__menu--selected"
        >
          <div className="sidebar__menu--home">
            <Home />
            <div className="sidebar__menu--line"></div>
          </div>
        </Nav>
        <Nav
          classSelected={menu === 2 ? true : false}
          to="/rooms"
          click={() => setMenu(2)}
          activeClassName="sidebar__menu--selected"
        >
          <div className="sidebar__menu--rooms">
            <Message />
            <div className="sidebar__menu--line"></div>
          </div>
        </Nav>
        <Nav
          classSelected={menu === 3 ? true : false}
          to="/users"
          click={() => setMenu(3)}
          activeClassName="sidebar__menu--selected"
        >
          <div className="sidebar__menu--users">
            <PeopleAlt />
            <div className="sidebar__menu--line"></div>
          </div>
        </Nav>
      </div>

      {page.width <= 760 ?
        <>
          <Switch>
            <Route path="/users" >
              <SidebarChat key="users" fetchList={fetchUsers} dataList={users} title="Users" path="/users" />
            </Route>
            <Route path="/rooms" >
              <SidebarChat key="rooms" fetchList={fetchRooms} dataList={rooms} title="Rooms" path="/rooms" />
            </Route>
            <Route path="/search">
              <SidebarChat key="search" dataList={searchList} title="Search Result" path="/search" />
            </Route>
            <Route path="/chats" >
              <SidebarChat key="chats" dataList={chats} title="Chats" path="/chats" />
            </Route>
          </Switch>
        </>
        :
        menu === 1 ?
          <SidebarChat key="chats" dataList={chats} title="Chats" />
          : menu === 2 ?
            <SidebarChat key="rooms" fetchList={fetchRooms} dataList={rooms} title="Rooms" />
            : menu === 3 ?
              <SidebarChat key="users" fetchList={fetchUsers} dataList={users} title="Users" />
              : menu === 4 ?
                <SidebarChat key="search" dataList={searchList} title="Search Result" />
                : null
      }
      <div className="sidebar__chat--addRoom" onClick={createChat}>
        <IconButton >
          <Add />
        </IconButton>
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* //  ref={(_cabecalho) => (cabecalho = _cabecalho)} */}
        <p class="cabecalho">Entre com o nome da sala de conversa</p>
        <br />
        <form>
          {/* // ref={(_campo) => (campo = _campo)} */}
          <input class="campo" type="text" value={text} onChange={handleChange} required />
          <br />
          {/* // ref={(_botao_nao) => (botao_nao = _botao_nao)}  */}
          <button class="botao_nao" onClick={closeModal}><b>Cancelar</b></button>
          {/* //  ref={(_botao_sim) => (botao_sim = _botao_sim)}  */}
          <button type='submit' class="botao_sim" onClick={generateChat}><b>Criar</b></button>
        </form>
      </Modal>
    </div>
  );
};

export default memo(Sidebar);
