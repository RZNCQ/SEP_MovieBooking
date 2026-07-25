const sql = require("mssql");
const dbconfig = require("../dbconfig");

async function getAllUsers(){
    let connection;
    try{
        connection = await sql.connect(dbconfig);
        const query = "SELECT UserID, Name, Email, Role FROM Users";
        const result = await connection.request().query(query);
        return result.recordset;
    }catch (error){
        console.error("Database error: ",error);
        throw error;
    }finally{
        if(connection){
            await connection.close().catch(err => console.error("Error closing connection: ",err));
        }
    }
}

//Get User By ID
async function getUserById(id) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "SELECT UserId, Name, Email, Role FROM Users WHERE UserId = @id";
    const request = connection.request();
    request.input("id", id);
    const result = await request.query(query);
    if (result.recordset.length === 0) {
      return null;
    }
    return result.recordset[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch(err => console.error("Error closing connection:", err));
    }
  }
}

//Get User By Email
async function getUserByEmail(email) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "SELECT * FROM Users WHERE Email = @email";
    const request = connection.request();
    request.input("email", email);
    const result = await request.query(query);
    if (result.recordset.length === 0) {
      return null; 
    }
    return result.recordset[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

//Create User
async function createUser(userData) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query =
      "INSERT INTO Users (Name, Email, Role, PasswordHash) " +
      "VALUES (@name, @email, @role, @passwordHash); SELECT SCOPE_IDENTITY() AS id;";
    const request = connection.request();
    request.input("name", userData.name);
    request.input("email", userData.email);
    request.input("passwordHash", userData.passwordHash);
    request.input("role", userData.role);
    const result = await request.query(query);
    const newUserId = result.recordset[0].id;
    return await getUserById(newUserId);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch(err => console.error("Error closing connection:", err));
    }
  }
}

//UPdate User
async function updateUser(id, userData) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query =
      "UPDATE Users SET Name = @name, Email = @email WHERE UserId = @id;";
    const request = connection.request();
    request.input("name", userData.name);
    request.input("email", userData.email);
    request.input("id", id);
    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch(err => console.error("Error closing connection:", err));
    }
  }
}

//Delete User
async function deleteUser(id) {
  let connection;
  try {
    connection = await sql.connect(dbconfig);
    const query = "DELETE FROM Users WHERE UserId = @id";
    const request = connection.request();
    request.input("id", id);
    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close().catch(err => console.error("Error closing connection:", err));
    }
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};