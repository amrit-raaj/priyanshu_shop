<?php
 $conn=mysqli_connect('localhost', 'root', '', 'registration');

 if(!$conn)
 {
     die("Connection failed!" . mysqli_connect_error());
 }
 if(isset($_POST['submit']))
 {
     
    $pass = $_POST['pass'];
    $email = $_POST['email'];
 $connect=" SELECT * FROM user WHERE  email='$email' && password='$pass' ";
 $result=mysqli_query($conn,$connect);
 if(mysqli_num_rows($result)>0)
 {
    $ans=mysqli_fetch_array($result);
    setcookie ("PHPSESSID", "", time() - 3600, '/');
     echo "<script>
      window.location.href='content.html';
      </script>";
 }else
 {
   echo "<script>
   alert('Invalid email or password');
   window.location.href='index.php';
   </script>";
   
  }
}
 mysqli_close($conn);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <script
      src="https://kit.fontawesome.com/3426015933.js"
      crossorigin="anonymous"
    ></script>
  <body>
    <title>FORM</title>
    <div class="background">
    <img src="images/img/blank-profile-picture-gd8a7a095d_1280.png" alt="">

      <!-- <h1><strong>USER</strong></h1> -->
      <form action="" method="POST" autocomplete="off">
        <div class="t space">
          <span class="fa fa-envelope-o"></span>
          <input type="text" name="email" required placeholder="Email" />
        </div>
        <div class="t space">
          <span class="fa fa-key"></span>
          <input type="password" name="pass" class="password" required placeholder="Password" />
          <span class="show">SHOW</span>
        </div>
        <div class="k">
          <a href="#">Forgot password</a>
        </div>
        <button type="submit" class="button  button-block" name="submit">LOGIN</button>
        <div class="signup">
          Don't have account?
          <a href="form.php">Signup Now</a>
        </div>
      </form>
    </div>
    <script>
      const pass_field=document.querySelector('.password');
      const show_btn=document.querySelector('.show');
      show_btn.addEventListener("click",function(){
        if(pass_field.type ==="password")
        {
          pass_field.type="text";
          show_btn.style.color="black";
          show_btn.textContent="HIDE";
        }
        else
        {
          pass_field.type="password";
          show_btn.textContent="SHOW";
          show_btn.style.color="#222";
        }

      });
    </script>
  </head>
  </body>
</html>
