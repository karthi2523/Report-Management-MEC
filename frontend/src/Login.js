import { useState } from "react"
import { onLogin } from "./connect"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Container, Paper, Typography, Avatar, TextField, InputAdornment, IconButton ,Box} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import "./sty.css"

const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50', // Change this to your preferred primary color
      },
      secondary: {
        main: '#ff5722', // Change this to your preferred secondary color
      },
    },
  });


export const Login=()=>{

    const[logger,setLogger]=useState({
        "id":"",
        "pass":""
    })

    const gather=(eve)=>{
        const{name,value}=eve.target
        setLogger((old)=>{
            return{
                ...old,
                [name]:value
            }
        })
    }

    const onLoginClicked=async()=>{
        // console.log(JSON.stringify(logger))
        try{
        const temp=await onLogin(logger)
        if(temp.faculty_id){
            sessionStorage.setItem("person",JSON.stringify(temp))
            window.location.assign("/")
        }
      }
      catch(e){
        console.log("password Wrong")
      }
    }
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    }
    return(
//         <>
//         <head style={{alignItems:'center'}} className="login-container">
           
          
//         <img src="https://mec.edu.in/wp-content/uploads/2021/02/main-logo.png"  class="icn menuicn responsive-img"/>
       
//         </head>
//         <body style={{ backgroundImage: 'url(https://mec.edu.in/wp-content/uploads/2021/10/8.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', minHeight: '100vh' }}>
//     <div className="container">
//         <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//             <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5">
//                 {/* <h1 className="text-center text-info">Muthayammal Engineering College, Rasipuram</h1> */}
//                 <div className="shadow p-5 rounded-2" style={{ backgroundColor: '#f7f1d7' }}>
//                     <div className='formGroup'>
//                         <label >Faculty ID</label>
//                         <input type="eid" name="id" value={logger.id} onChange={gather} placeholder="Faculty Id to login" className="form-control" />
//                     </div>
//                     <div className="formGroup">
//                         <label>Password</label>
//                         <input type="password" name="pass" value={logger.pass} onChange={gather} placeholder="Password to login" className="form-control" />
//                     </div>
//                     <div className="d-grid gap-2">
//                         <button type="button" className="btn btn-outline-info" onClick={onLoginClicked}>Login</button>
//                         <button type="button" className="btn btn-outline-danger">Cancel</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </body>

//         </>
<>
<head style={{}} className="login-container">
              
   <img src="https://mec.edu.in/wp-content/uploads/2021/02/main-logo.png"  class="icn menuicn responsive-img"/>
       
</head>
<body>
{/* <img src="https://mec.edu.in/wp-content/uploads/2020/12/about-img.png" alt="College Logo" style={{ width: '100%', height:'150%', marginTop:'30px', maxHeight:'120%',maxWidth: '80%', borderRadius: '2%' }} /> */}

<div>
    .
    <p>.
        
    </p>
    
</div>

<div style={{marginTop:"100px",display: 'flex', width: '100%', height:'100%'}}>
{/* <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,border:'2px solid black'}}>
    Report Generator
          </Box> */}
<ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
       
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="facultyId"
            label="Faculty ID"
            name="id"
            type="id"
            autoComplete="id"
            value={logger.id}
            onChange={gather}
          />

<TextField
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Password"
            type={showPassword ? 'id' : 'password'}
            id="password"
            autoComplete="current-password"
            value={logger.pass}
            onChange={gather}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          

          

          <Button type="button" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={onLoginClicked}>
            Login
          </Button>
          <Button type="button" fullWidth variant="contained" color="secondary">
            Cancel
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
</div>
</body>
</>
    )
}