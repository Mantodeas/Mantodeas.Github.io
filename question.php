<head>
		<meta charset="utf-8" />
		<title>音乐收集网站</title>
		<style type="text/css">
			* {
				margin: 0;
				padding: 0;
			}
			
			ul {
				list-style-type: none;
			}
			
			.top {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				z-index: 999;
				height: 50px;
				background-color: rgba(0, 0, 0, 0.6);
			}
			
			.menu {
				width: 1000px;
				margin: 0 auto;
				overflow: hidden;
			}
			
			.logo {
				float: left;
				margin-top: 9px;
			}
			
			.logo a {
				display: inline-block;
				width: 32px;
				height: 32px;
				background-image: url("http://temp.im/32x32/4CD964/fff");
				background-size: 32px 32px;
			}
			
			.nav {
				float: left;
				margin-top: 10px;
				font-size: 0;
			}
			
			.nav li {
				display: inline-block;
				margin-left: 40px;
			}
			
			.nav a {
				display: inline-block;
				height: 30px;
				line-height: 30px;
				font-size: 12px;
				color: #fff;
				text-decoration: none;
			}
			
			.nav a:hover {
				color: #83c3f3;
			}

            .nav p:hover {
                float: right;
                margin-top: 40px;
                height: 50px;
            }

            .kk {
                position: relative;
                top: 100px;
            }  
		</style>
	</head>

    <body>
		<div class="top">
			<div class="menu">
				<!-- <h1 class="logo"><a href="http://www.dowebok.com/"></a></h1> -->
				<ul class="nav">
					<li>
						<a href="/index.php">首页</a>
					</li>
					<li>
						<a href="/list.php">列表</a>
					</li>
                    <li>
						<a href="/question.php">新建</a>
					</li>
				</ul>
			</div>
		</div>
	</body>

<form class="kk">
Music name: <input type="text" name="musicname"><br>
Author name: <input type="text" name="authorname"><br><br>
Music: <input type="text" name="music"><br>
Image: <input type="text" name="image"><br>
Web: <input type="text" name="web"><br><br>
Comment: <input type="text" name="comment"><br><br>
</form>
<!-- <form name="input" action="html_form_action.php" method="get" class="kk">
Username: <input type="text" name="user">

</form> -->
<input type="submit" value="Submit" class="kk">