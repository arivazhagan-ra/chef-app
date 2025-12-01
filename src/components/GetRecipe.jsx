export default function GetRecipe(props) {
  return (
    <div className="recipe">
      <button className={props.ingredient > 3 ? "show" : "hide"} onClick={props.handleClick}>
        Get Recipe
      </button>
    </div>
  );
}