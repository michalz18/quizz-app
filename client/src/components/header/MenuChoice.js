import "./MenuChoice.css";
function MenuChoice({ menuChoice, changePage}) {
    return <div id={menuChoice.id} className={menuChoice.active ? "menu-item active" : "menu-item"} onClick={() => changePage(menuChoice.text)}>{ menuChoice.text }</div>
}
export default MenuChoice;