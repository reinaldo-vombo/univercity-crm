const themes = [
   {
      name: "Padrão",
      value: "dafault",
      color: 'oklch(0.205 0 0)',
   },
   {
      name: "Amethyst",
      value: "amethyst",
      color: 'oklch(0.6104 0.0767 299.7335)',
   },
   {
      name: "Solar Dust",
      value: "solar-dust",
      color: '#b45309',
   },
   {
      name: "Vitage",
      value: "vitage",
      color: 'oklch(0.9914 0.0098 87.4695)',
   },
   {
      name: "Naturesa",
      value: "nature",
      color: 'oklch(0.5234 0.1347 144.1672)',
   },
];
const ApperenceTab = () => {
   return (
      <div>
         <div>
            <h2>Escolha um padrão de cor</h2>
            <p></p>
         </div>
         <div>
            {themes.map((color) => (
               <span className="rounded-full size-4 shadow" style={{ backgroundColor: color.color }} key={color.value} />
            ))}
         </div>
         <div></div>
      </div>
   )
}

export default ApperenceTab
