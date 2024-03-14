const {Country,Activity} = require('../db')
const {Op} = require('sequelize')


const allCountries = async(req,res)=>{
    try{
        const allCountry=await Country.findAll();
        res.status(200).json(allCountry.map(pais=>pais.toJSON()))
    } catch (error){
        res.status(500).send(error)
    }
}

const countryById=async (req,res)=>{
    try{
        const {idPais}=req.params
        const country=await Country.findOne({
            where: {
                id: idPais.toUpperCase()
            },
            include: Activity
        })
        return res.stattus(200).json(country)

    } catch(error){
        res.status(500).send(error)
    }
}

const countryByName=async (req,res)=>{
   try{
    const {pais}=req.query
    const countries=Country.findAll({
        where: {
            name: {
                [Op.like]: '%'+pais.toUpperCase()+'%'
            }
        }
    })
    if (!countries){
        return res.status(200).send('No hay coincidencias para el pais especificado')
    }
    return res.status(200).json(countries)

} catch(error){
    res.status(500).send(error)
}
}
module.exports={allCountries,countryById,countryByName}