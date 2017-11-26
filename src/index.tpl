<!DOCTYPE html>
<html lang="hu">

<head>
  <meta charset="UTF-8">
  <meta name="author" content="qnodesign">
  <title>RRWP APP</title>
  <meta http-equiv="X-UA-compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb"
    crossorigin="anonymous">
  <link rel="stylesheet" href="rrwp.<%= webpack.hash %>.css">
</head>

<body>
  <div id="root" />
  <script>
    __REACT_DEVTOOLS_GLOBAL_HOOK__ = parent.__REACT_DEVTOOLS_GLOBAL_HOOK__

  </script>
  <script type="text/javascript" src="vendor.<%= webpack.hash %>.js"></script>
  <script type="text/javascript" src="rrwp.<%= webpack.hash %>.js"></script>
</body>

</html>
