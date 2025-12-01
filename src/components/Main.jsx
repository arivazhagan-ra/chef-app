import { useEffect, useState, useRef } from "react"
import GetRecipe from "./GetRecipe";
import ClaudeRecipe from "./ClaudeRecipe";

export default function Main(){

    const [ingredient, setIngredient] = useState([]);
    const [recipe,setRecipe] = useState("");
    const [error,setError] = useState("");
    const [showBlur, setShowBlur] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const recipeRef= useRef(null);
    const [theme,setTheme] = useState(
        ()=> localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (recipe && recipeRef.current) {
            recipeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        }, [recipe]);
    useEffect(()=>{
        document.body.setAttribute("data-theme",theme);
        localStorage.setItem("theme",theme);
    },[theme]);

    const ingredientElements = ingredient.map((i,index)=>(
        <li key={index}>✨ {i}</li>
    ))

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient");
        if(newIngredient===""){
            alert("Ingredients cannot be empty");
            return;
        }
        setIngredient(prevIngredient => [...prevIngredient,newIngredient]);
        console.log(ingredient);
    }

    function toggleTheme(){
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    }
   async function handleClick() {
        setError("");
        setShowBlur(true);
        setShowLoader(true);

    try {
        const response = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ingredient }),
        });

    if (!response.ok) {
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Unable to read server response.");
      }
      throw new Error(data.error || "Something went wrong.");
    }

    const data = await response.json();
    setRecipe(data.recipe);

  } catch (err) {
    setError(err.message || "Network error. Please try again.");
  } finally {
    setShowBlur(false);
    setShowLoader(false);
  }
}

    return(
        <main>
            <div className="title">
                <h4>What's in you kitchen?</h4>
                <p>Enter atleast 4 ingredients</p>
            </div>
            <button onClick={toggleTheme} className="theme-toggle">
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
            <form action={addIngredient}>
                <input type="text" placeholder="eg.chicken" name="ingredient"></input>
                <button>+ Add ingredient</button>
            </form>
            {showBlur && <div id="blurLayer"></div>}
            {showLoader && <div id="loader">
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                <h2>Cooking something special for you...</h2>
            </div>}
            {error && <div className="error">{error}</div>}
            <ul>{ingredientElements}</ul>
            {ingredient.length > 1 && <GetRecipe ingredient={ingredient.length} handleClick={handleClick}/>}
            {recipe && <ClaudeRecipe result={recipe} valueRef={recipeRef} />}
        </main>
    )
}