<?php
if(isset($postData['profile_image']) && $postData['profile_image'] != ''){
                $image = $postData['profile_image'];
                if(strlen($image) > 128) {
                    list($mime, $imgData)   = explode(';', $image);
                    list(, $imgData)       = explode(',', $imgData);
                    $imgData = base64_decode($imgData);

                    $mime = explode(':',$mime)[1];
                    $ext = explode('/',$mime)[1];
                    $name = mt_rand().time();
                    $file_name = $name.'.'.$ext;
                    $savePath = 'uploads/'.$file_name;

                    file_put_contents(public_path().'/'.$savePath, $imgData);
                    //dd($data);
                    $data['user_image'] = $file_name;
                }
            }