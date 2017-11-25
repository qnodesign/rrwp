<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="author" content="qnodesign">
  <title>RRWP APP</title>
  <meta http-equiv="X-UA-compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="rrwp.<%= webpack.hash %>.css">
</head>

<body>
  <div id="root" />
  <script>__REACT_DEVTOOLS_GLOBAL_HOOK__ = parent.__REACT_DEVTOOLS_GLOBAL_HOOK__</script>
  <script type="text/javascript" src="vendor.<%= webpack.hash %>.js"></script>
  <script type="text/javascript" src="rrwp.<%= webpack.hash %>.js"></script>
</body>

</html>