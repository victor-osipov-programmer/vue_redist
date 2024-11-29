fetch(
    "http://localhost:8000/api/email/verify/3/3ddfbf4d5182d9106027a298ad9ca21ac94f9bf2?expires=1732868862&signature=e54106e139ed3ab2cc067a7fdf5af61c4a7f14c2c434a85f3a395be675009f36",
    {
        headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": document.cookie.match(/XSRF-TOKEN=(\w+)/)[1],
        },
    }
).then(() => {
    console.log(123);
});

fetch("http://localhost:8000/sanctum/csrf-cookie");
