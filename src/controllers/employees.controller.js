import { pool } from "../db.js"

export const listarUsuarios = async (req,res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM usuarios')
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message:"Error al ejeuctar el metodo GetEMployee(un solo empleado)"
        })
    }
}

export const listarUsuario = async(req,res) => {
    try{
        //throw new Error('DB error')
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id])
        /* const [rows] = await pool.query('SELECT * FROM employee WHERE iddentificacion=?, nombres=?, apellidos=?, correo=?, telefono=?, contraseña=?, rol=?', [req.params.id]) */
    
        if(rows.length <= 0) return res.status(404).json({
            message:'Usuario no encontrado'
        });

        res.json(rows[0])
    }catch(error){
        return res.status(500).json({
            message:"Error el ejejcutar el metodod GetEmployee"
        })
    }
}

export const registrarUsuario = async (req,res)=>{
    const {identificacion,nombres,apellidos,correo,telefono,contraseña,rol} = req.body
    try{
        
        const [rows] = await pool.query('INSERT INTO usuarios(identificacion,nombres,apellidos,correo,telefono,contraseña,rol) VALUES (?,?,?,?,?,?,?)', [identificacion,nombres,apellidos,correo,telefono,contraseña,rol])
        res.send({
            id: rows.insertId,
            identificacion,
            nombres,
            apellidos,
            correo,
            telefono,
            contraseña,
            rol
        })
    }catch(error){
        return res.status(500).json({
            message:"Error al ejecutar el metodo CreateEmployee"
        })
    }
}

export const eliminarUsuario = async (req,res)=>{
    try{
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id])

        if(result.affectedRows <= 0) return res.status(404).json({
            message:"Usuario no encontrado"
        });

        console.log(result)
        //res.sendStatus(204)
        return res.status(200).json({
            message: "Usuario eliminado con éxito!"
        });

    }catch(error){
        return res.status(500).json({
            message:"Error el ejejcutar el metodo DeleteEmployee"
        })
    }
}

/* export const updateEmployee = async (req,res)=>{
    const {id} = req.params
    const {identificacion,nombres,apellidos,correo,telefono,contraseña,rol,estado} = req.body

    try{
        const [result] = await pool.query('UPDATE usuarios SET identificacion=IFNULL(?,identificacion), nombres=IFNULL(?,nombres), apellidos=IFNULL(?,apellidos), correo=IFNULL(?,correo), telefono=IFNULL(?,telefono), contraseña=IFNULL(?,contraseña), rol=IFNULL(?,rol, estado=IFNULL(?,estado)  WHERE id = ?', [identificacion,nombres,apellidos,correo,telefono,contraseña,rol,estado,id])

        console.log(result)

        if(result.affectedRows === 0) return res.status(404).json({
            message:"Usuario no encontrado"
        })

        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
        res.json(rows[0])

    }catch(error){
        console.error('Error al ejecutar el método PATCH:', error);
        return res.status(500).json({
            message: 'Error al ejecutar el método PATCH',
            error: error.message,
        });
    }
} */
export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { identificacion, nombres, apellidos, correo, telefono, contraseña, rol, estado } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE usuarios SET identificacion=IFNULL(?, identificacion), nombres=IFNULL(?, nombres), apellidos=IFNULL(?, apellidos), correo=IFNULL(?, correo), telefono=IFNULL(?, telefono), contraseña=IFNULL(?, contraseña), rol=IFNULL(?, rol), estado=IFNULL(?, estado) WHERE id = ?',
            [identificacion, nombres, apellidos, correo, telefono, contraseña, rol, estado, id]
        );

        console.log(result);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        res.json(rows[0]);

    } catch (error) {
        console.error('Error al ejecutar el método PATCH:', error);
        return res.status(500).json({
            message: 'Error al ejecutar el método PATCH',
            error: error.message,
        });
    }
};


export const validarUsuario = async (req, res) => {
    try {
        const { identificacion, contraseña } = req.body;

        const [result] = await pool.query('SELECT * FROM usuarios WHERE identificacion = ? AND contraseña = ?', [identificacion, contraseña]);

        if (result.length > 0) {
            return res.status(200).json({
                message: "Usuario validado con éxito!!!"
            });
        } else {
            return res.status(401).json({
                message: "Usuario no válido. Verifica la identificación y contraseña."
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al usar el metodo ValidarUsuario"
        });
    }
};


