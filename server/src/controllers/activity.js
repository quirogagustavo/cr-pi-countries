const {Country,Activity}=require('../db')

const newActivity=async(req,res)=>{
  try{  
    const {nombre,dificultad,duracion,temporada,countryId}=req.body;
    //Crear la actividad en la tabla Activity
    //Validar que el name exista, si existe el name
    //actuasliza en la tabla con los valores enviados.
    const [actividad,creada]=await Activity.findOne({where:{name:nombre},
    defaults: {dificultad: dificultad, duracion: duracion, temporada: temporada}})

    if (!creada){
        await actividad.update({dificultad: dificultad, duracion: duracion, temporada: temporada})
    }
    //Recorrer el arreglo de Country, validar que exista
    //y agregar en la asociacion el idCountry y idActivity
    countryId.array.forEach(async (element) => {
        //Validar que existe el id del pais
        const country=await Country.findOne({where:{id:element}})
        //Si exite el country agrego en la asociacion de n a m 
        //el id de actividad y el id de cada pais
        if (country){

            await actividad.addCountry(element)
        }
        
    });
    res.status(200).send('Se agrego la actividad')
    } catch(error) {
        res.status(500).send(error)
    }
}

const Activities=async(req,res)=>{
    try{
        const actividad=await Activity.findAll()
        return res.status(200).json(actividad)
    } catch(error){
        return res.status(500).send(error)

    }
}

module.exports={newActivity, Activities}
