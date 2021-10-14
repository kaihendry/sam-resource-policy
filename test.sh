# url for invokeDenied
if curl -sf https://ybitzpihyj.execute-api.ap-southeast-1.amazonaws.com/Prod/hello/
then
	echo test fails
	exit 1
else
	echo test passes
fi
