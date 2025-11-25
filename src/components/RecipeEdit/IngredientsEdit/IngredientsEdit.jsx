
const IngredientChip = ({ingredients, children})=>{
    return (
        <div>
            {ingredients.map((ingredient, index)=>{
                return (
                    <div className="form-control" key={index}>
                        <label htmlFor={ingredient.name + `name`}>Ingredient name</label>
                        <input type="text" name={ingredient.name + `name`} value={ingredient.name}/>
                        <label htmlFor={ingredient.name + `measurement`}>Quantity</label>
                        <input type="number" name={ingredient.name + `measurement`} />
                        <label htmlFor={ingredient.name + `unit`}>Unit</label>
                        <select name="" id="">
                            <option value="">cup</option>
                            <option value="">gallon</option>
                            <option value="">gram</option>
                            <option value="">litre</option>
                            <option value="">kilogram</option>
                            <option value="">ounce</option>
                            <option value="">quart</option>
                            <option value="">tbsp</option>
                        </select>
                        {children}
                    </div>
                )
            })}
        </div>
    )
}
export default IngredientChip