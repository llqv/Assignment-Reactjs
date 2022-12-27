export const uploadFile = async ({ files, options, upload_preset }) => {
    let url: string = ""
    await Promise.all(
        files.map(async (file: any) => {
            return new Promise(async (resolve) => {
                const form = new FormData()
                form.append("file", file)
                form.append("upload_preset", upload_preset)
                form.append("api_key", "353916331322373")
                form.append("cloud_name", "local12")
                const result = await fetch("https://api.cloudinary.com/v1_1/local12/image/upload", {
                    method: "POST",
                    body: form
                }).then(e => e.json())
                url = result.secure_url
                resolve(result)
            })
        })
    )
    return url.replace("upload", `upload/c_crop,h_${options.height},w_${options.width},x_${options.left},y_${options.top}`)
}