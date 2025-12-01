import chefclaude from "../assets/chef-claude-icon.png";
export default function Header(){
    return(
        <header>
            <img src={chefclaude} alt="chef-claude-icon"></img>
            <h1>Chef Claude</h1>
            <p>Your friendly AI chef,ready to create magic with your ingredients</p>
        </header>
    )
}