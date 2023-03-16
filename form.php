<?php
 $conn=mysqli_connect('localhost', 'root', '', 'registration');

 if(!$conn)
 {
     die("Connection failed!" . mysqli_connect_error());
 }
 if(isset($_POST['submit']))
 {
     $name = $_POST['name'];
     $pass = $_POST['pass'];
     $email = $_POST['email'];
     $cpass = $_POST['cpass'];
 $connect=" SELECT * FROM user WHERE  name='$name' or email='$email' ";
 $result=mysqli_query($conn,$connect);
 if(mysqli_num_rows($result) > 0)
 {
    $error='user already exist!';
 }else
 {
   if($pass!=$cpass)
   {
     $error='password not matched';
   }else
   {
     $insert="INSERT INTO user(name,email,password) VALUES('$name','$email','$pass')";
     mysqli_query($conn,$insert);
     setcookie ("PHPSESSID", "", time() - 3600, '/');
     header("location:trial.html");
   }
 }
 mysqli_close($conn);
}

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Market</title>
    <link rel="stylesheet" href="indes.css" />
    <script
      src="https://kit.fontawesome.com/3426015933.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <div class="background">
      <img src="images/img/blank-profile-picture-gd8a7a095d_1280.png" alt="">
      <h1>Sign Up for Free</h1>
      <!-- <div class="t">
                <span  class="fa-solid fa-user fa-3x"></span>
            </div> -->
      <form action="" method="POST" autocomplete="off">
        <div class="test space">
          <span class="fa-solid fa-user"></span>
          <input type="text" required placeholder="Name" autocomplete="off" name="name"/>
        </div>
        <div class="test space">
          <span class="fa fa-key"></span>
          <input type="password" required placeholder="New password" autocomplete="off" name="pass"/>
        </div>
        <div class="test space">
          <span class="fa fa-key"></span>
          <input type="password" required placeholder="Confirm password" autocomplete="off" name="cpass"/>
        </div>
        <div class="test space">
          <span class="fa fa-envelope-o"></span>
          <input type="email" required placeholder="Email" autocomplete="off" name="email"/>
        </div>
        <?php
          if(isset($error)){
              echo '<span class="error-msg">'.$error.'</span>';
          };

        ?>
        <button type="submit" class="button  button-block" name="submit">Register</button>
      </form>
    </div>
  </body>
</html>